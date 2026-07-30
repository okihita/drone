import { supabase, getServiceClient } from "@/lib/supabase";
import { generateSlug, decodeHtmlEntities } from "@/lib/text";
import type { NewsItem } from "@/types";

function getClient() {
  try {
    return getServiceClient();
  } catch {
    return supabase;
  }
}

// ── Interfaces ────────────────────────────────────────────────────────────────

interface WPPostItem {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string }>;
    author?: Array<{ name?: string }>;
  };
}

interface ClassificationResult {
  jurisdiction: string;
  category: string;
  threatLevel: string;
  summary: string;
}

export interface SyncReport {
  success: boolean;
  totalFetched: number;
  newlyIngested: number;
  skippedCount: number;
  errors: string[];
  items: Array<{ id: number; title: string; status: string }>;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function cleanHtml(rawHtml: string): string {
  return decodeHtmlEntities(rawHtml);
}

/** Fallback rule-based classifier if GEMINI_API_KEY is absent or fails */
function heuristicClassify(title: string, contentSnippet: string): ClassificationResult {
  const text = `${title} ${contentSnippet}`.toLowerCase();

  let jurisdiction = "ASEAN Regional";
  if (text.includes("indonesia") || text.includes("kominfo") || text.includes("jakarta")) {
    jurisdiction = "Indonesia (ID)";
  } else if (text.includes("vietnam") || text.includes("hanoi")) {
    jurisdiction = "Vietnam (VN)";
  } else if (text.includes("philippines") || text.includes("manila") || text.includes("tagalog")) {
    jurisdiction = "Philippines (PH)";
  } else if (text.includes("singapore") || text.includes("imda")) {
    jurisdiction = "Singapore (SG)";
  } else if (text.includes("malaysia") || text.includes("kuala lumpur")) {
    jurisdiction = "Malaysia (MY)";
  } else if (text.includes("thailand") || text.includes("bangkok")) {
    jurisdiction = "Thailand (TH)";
  } else if (text.includes("myanmar") || text.includes("burma")) {
    jurisdiction = "Myanmar (MM)";
  } else if (text.includes("cambodia")) {
    jurisdiction = "Cambodia (KH)";
  }

  let category = "AI Governance";
  if (text.includes("defa") || text.includes("trade") || text.includes("commerce")) {
    category = "DEFA";
  } else if (text.includes("privacy") || text.includes("cross-border") || text.includes("data transfer")) {
    category = "Cross-Border Data";
  } else if (text.includes("cybersecurity") || text.includes("surveillance") || text.includes("security")) {
    category = "Cybersecurity";
  }

  let threatLevel = "Medium Risk";
  if (text.includes("danger") || text.includes("harm") || text.includes("weapon") || text.includes("shutdown")) {
    threatLevel = "High Alert";
  } else if (text.includes("rights-based") || text.includes("framework") || text.includes("dialogue")) {
    threatLevel = "Rights Verified";
  }

  const cleanedExcerpt = cleanHtml(contentSnippet);
  const summary = cleanedExcerpt.length > 220 
    ? cleanedExcerpt.substring(0, 217) + "..." 
    : cleanedExcerpt || title;

  return { jurisdiction, category, threatLevel, summary };
}

/** Classifies an article using Google Gemini AI Flash (Free Tier) */
async function classifyWithGemini(
  title: string, 
  excerpt: string
): Promise<ClassificationResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return heuristicClassify(title, excerpt);
  }

  try {
    const prompt = `Analyze this EngageMedia digital rights / AI article and output ONLY a JSON object with 4 keys:
1. "jurisdiction": Choose EXACTLY ONE from ["Indonesia (ID)", "Malaysia (MY)", "Singapore (SG)", "Philippines (PH)", "Thailand (TH)", "Vietnam (VN)", "Cambodia (KH)", "Laos (LA)", "Myanmar (MM)", "Brunei (BN)", "Timor-Leste (TL)", "ASEAN Regional"].
2. "category": Choose EXACTLY ONE from ["AI Governance", "DEFA", "Cross-Border Data", "Cybersecurity"].
3. "threatLevel": Choose EXACTLY ONE from ["High Alert", "Medium Risk", "Rights Verified"].
4. "summary": Provide a concise 2-sentence executive policy summary.

Article Title: "${title}"
Excerpt: "${cleanHtml(excerpt)}"`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      }
    );

    if (!res.ok) {
      return heuristicClassify(title, excerpt);
    }

    const data = await res.json();
    const rawJsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJsonText) return heuristicClassify(title, excerpt);

    const parsed = JSON.parse(rawJsonText);
    return {
      jurisdiction: parsed.jurisdiction || "ASEAN Regional",
      category: parsed.category || "AI Governance",
      threatLevel: parsed.threatLevel || "Medium Risk",
      summary: parsed.summary || cleanHtml(excerpt),
    };
  } catch (err) {
    console.warn("Gemini classification failed, falling back to heuristic:", err);
    return heuristicClassify(title, excerpt);
  }
}

// ── Ingestion Core ────────────────────────────────────────────────────────────

/** Extract primary image from WP featured media or post HTML content */
function extractMajorImage(post: WPPostItem): string | null {
  // 1. Featured image from WP embedded media
  const featuredUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (featuredUrl && typeof featuredUrl === "string" && featuredUrl.trim()) {
    return featuredUrl.trim();
  }

  // 2. Parse first <img> tag src from HTML content
  const contentHtml = post.content?.rendered || "";
  const imgMatch = contentHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch && imgMatch[1] && imgMatch[1].trim()) {
    const src = imgMatch[1].trim();
    if (!src.includes("gravatar.com") && !src.endsWith(".svg")) {
      return src;
    }
  }

  return null;
}

async function fetchEngageMediaPosts(perPage = 30): Promise<WPPostItem[]> {
  // Fetch posts with tag = 381 (Artificial Intelligence) or general posts
  const url = `https://engagemedia.org/wp-json/wp/v2/posts?tags=381&per_page=${perPage}&_embed=true`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "DRONE-Observatory-Ingester/1.0 (+https://engagemedia.org)",
    },
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`EngageMedia WP API returned HTTP ${response.status}`);
  }

  return (await response.json()) as WPPostItem[];
}

export async function syncEngageMediaContent(perPage = 30): Promise<SyncReport> {
  const report: SyncReport = {
    success: true,
    totalFetched: 0,
    newlyIngested: 0,
    skippedCount: 0,
    errors: [],
    items: [],
  };

  try {
    const posts = await fetchEngageMediaPosts(perPage);
    report.totalFetched = posts.length;

    for (const post of posts) {
      const cleanTitle = cleanHtml(post.title.rendered);
      const cleanExcerpt = cleanHtml(post.excerpt.rendered);
      const imageUrl = extractMajorImage(post);

      const contentHtml = post.content?.rendered || "";

      // Check if post already exists in news_items DB
      const { data: existing } = await getClient()
        .from("news_items")
        .select("id, wp_post_id, image_url, raw_wp_data")
        .eq("wp_post_id", post.id)
        .maybeSingle();

      if (existing) {
        // Backfill image or full content if existing record is missing them
        let needsUpdate = false;
        const updateFields: Record<string, unknown> = {};

        if (!existing.image_url && imageUrl) {
          updateFields.image_url = imageUrl;
          needsUpdate = true;
        }

        // Parse existing raw_wp_data to check for content_html
        let existingRaw: Record<string, unknown> = {};
        try {
          if (existing.raw_wp_data) existingRaw = JSON.parse(existing.raw_wp_data as string);
        } catch {}

        if (!existingRaw.content_html && contentHtml) {
          updateFields.raw_wp_data = JSON.stringify({
            ...existingRaw,
            wp_id: post.id,
            original_slug: post.slug,
            content_html: contentHtml,
          });
          needsUpdate = true;
        }

        if (needsUpdate) {
          await getClient()
            .from("news_items")
            .update(updateFields)
            .eq("id", existing.id);
          report.items.push({ id: post.id, title: cleanTitle, status: "updated_image" });
        } else {
          report.items.push({ id: post.id, title: cleanTitle, status: "skipped_exists" });
        }
        report.skippedCount++;
        continue;
      }

      const authorName = post._embedded?.author?.[0]?.name || "EngageMedia Research";
      const pubDate = post.date ? post.date.substring(0, 10) : new Date().toISOString().substring(0, 10);
      const slug = generateSlug(cleanTitle);

      // AI/Heuristic Classification
      const classification = await classifyWithGemini(cleanTitle, cleanExcerpt);

      const payload: Partial<NewsItem> & Record<string, unknown> = {
        wp_post_id: post.id,
        status: "pending_review", // Staged for Human-In-The-Loop editor review
        title: cleanTitle,
        jurisdiction: classification.jurisdiction,
        category: classification.category,
        threat_level: classification.threatLevel,
        summary: classification.summary,
        source_url: post.link,
        source_name: "EngageMedia",
        image_url: imageUrl,
        author: authorName,
        read_time: "4 min read",
        slug: slug,
        published_date: pubDate,
        raw_wp_data: JSON.stringify({
          wp_id: post.id,
          original_slug: post.slug,
          content_html: contentHtml,
        }),
      };

      const { error: insertError } = await getClient()
        .from("news_items")
        .insert(payload);

      if (insertError) {
        report.errors.push(`Post ID ${post.id} failed: ${insertError.message}`);
        report.items.push({ id: post.id, title: cleanTitle, status: "error" });
      } else {
        report.newlyIngested++;
        report.items.push({ id: post.id, title: cleanTitle, status: "staged_pending_review" });
      }
    }
  } catch (err: unknown) {
    report.success = false;
    const msg = err instanceof Error ? err.message : String(err);
    report.errors.push(`Ingestion pipeline failed: ${msg}`);
  }

  return report;
}
