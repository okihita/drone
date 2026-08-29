import { generateSlug, decodeHtmlEntities } from "@/lib/text";
import { fetchAirtableTable } from "./airtableClient";

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
  } else if (text.includes("philippines") || text.includes("manila")) {
    jurisdiction = "Philippines (PH)";
  } else if (text.includes("malaysia") || text.includes("kuala lumpur")) {
    jurisdiction = "Malaysia (MY)";
  } else if (text.includes("thailand") || text.includes("bangkok")) {
    jurisdiction = "Thailand (TH)";
  } else if (text.includes("singapore")) {
    jurisdiction = "Singapore (SG)";
  }

  let category = "DATA GOVERNANCE";
  if (text.includes("defa") || text.includes("trade") || text.includes("treaty") || text.includes("rcep")) {
    category = "DEFA & TREATIES";
  } else if (text.includes("ai") || text.includes("artificial intelligence") || text.includes("algorithm")) {
    category = "AI ETHICS & WORK";
  } else if (text.includes("surveillance") || text.includes("censorship") || text.includes("cyber")) {
    category = "CYBERSECURITY";
  } else if (text.includes("labor") || text.includes("gig") || text.includes("worker")) {
    category = "DIGITAL LABOR";
  }

  let threatLevel = "Medium Alert";
  if (text.includes("ban") || text.includes("criminal") || text.includes("prison") || text.includes("shutdown")) {
    threatLevel = "Critical Alert";
  } else if (text.includes("mandate") || text.includes("restriction") || text.includes("penalty") || text.includes("threat")) {
    threatLevel = "High Alert";
  } else if (text.includes("recommendation") || text.includes("guideline") || text.includes("draft")) {
    threatLevel = "Advisory";
  }

  let cleanSummary = cleanHtml(contentSnippet).replace(/\s+/g, " ").trim();
  if (cleanSummary.length > 250) {
    cleanSummary = cleanSummary.substring(0, 247) + "...";
  }

  return { jurisdiction, category, threatLevel, summary: cleanSummary };
}

/** LLM Classifier using Google Gemini Flash API */
async function classifyWithGemini(title: string, excerpt: string): Promise<ClassificationResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return heuristicClassify(title, excerpt);
  }

  const prompt = `You are a digital rights intelligence analyst for DRONE (Digital Rights Observatory & Network Evaluator in Southeast Asia).
Analyze this publication headline and excerpt:
TITLE: "${title}"
EXCERPT: "${excerpt}"

Provide a JSON evaluation matching exactly this schema:
{
  "jurisdiction": One of ["Indonesia (ID)", "Vietnam (VN)", "Philippines (PH)", "Malaysia (MY)", "Thailand (TH)", "Singapore (SG)", "Myanmar (MM)", "Cambodia (KH)", "Laos (LA)", "Brunei (BN)", "Timor-Leste (TL)", "ASEAN Regional", "Global"],
  "category": One of ["DEFA & TREATIES", "DATA GOVERNANCE", "AI ETHICS & WORK", "CYBERSECURITY", "DIGITAL LABOR", "CROSS-BORDER DATA", "SURVEILLANCE & PRIVACY"],
  "threatLevel": One of ["Critical Alert", "High Alert", "Medium Alert", "Low Alert", "Advisory"],
  "summary": A concise 1-2 sentence executive briefing focusing on policy, trade, or digital rights impact. Maximum 200 characters.
}
Return ONLY pure JSON.`;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!res.ok) {
      console.warn(`[Gemini API] Failed status ${res.status}, falling back to heuristics`);
      return heuristicClassify(title, excerpt);
    }

    const data = await res.json();
    const rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) return heuristicClassify(title, excerpt);

    const parsed = JSON.parse(rawJson);
    return {
      jurisdiction: parsed.jurisdiction || "ASEAN Regional",
      category: parsed.category || "DATA GOVERNANCE",
      threatLevel: parsed.threatLevel || "Medium Alert",
      summary: parsed.summary || heuristicClassify(title, excerpt).summary
    };
  } catch (err) {
    console.warn("[Gemini API] Classification failed, using heuristics:", err);
    return heuristicClassify(title, excerpt);
  }
}

// ── Ingestion Core ───────────────────────────────────────────────────────────

export async function fetchEngageMediaPosts(perPage = 10): Promise<WPPostItem[]> {
  const url = `https://engagemedia.org/wp-json/wp/v2/posts?_embed&per_page=${perPage}&status=publish`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "DRONE-Observatory-Crawler/1.0 (+https://drone.okihita.com)",
      "Accept": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`WordPress API returned status ${res.status}: ${res.statusText}`);
  }

  return await res.json();
}

function extractMajorImage(post: WPPostItem): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (media?.source_url) return media.source_url;

  const content = post.content?.rendered || "";
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

/**
 * Main Ingestion Pipeline: Pulls latest WordPress posts and writes directly to Airtable CMS.
 */
export async function syncEngageMediaPosts(perPage = 10): Promise<SyncReport> {
  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_NEWS_TABLE || "News";

  const report: SyncReport = {
    success: true,
    totalFetched: 0,
    newlyIngested: 0,
    skippedCount: 0,
    errors: [],
    items: [],
  };

  if (!pat || !baseId) {
    report.success = false;
    report.errors.push("Missing AIRTABLE_PAT or AIRTABLE_BASE_ID");
    return report;
  }

  try {
    const posts = await fetchEngageMediaPosts(perPage);
    report.totalFetched = posts.length;

    // Fetch existing news records from Airtable to detect duplicates
    const existingRecords = await fetchAirtableTable<{ "Title"?: string; "Legacy ID"?: string; "Slug"?: string }>(
      tableName,
      { tag: "news" }
    );

    const existingLegacyIds = new Set(existingRecords.map(r => r.fields["Legacy ID"]).filter(Boolean));
    const existingTitles = new Set(existingRecords.map(r => (r.fields["Title"] || "").toLowerCase().trim()).filter(Boolean));

    for (const post of posts) {
      const cleanTitle = cleanHtml(post.title.rendered);
      const cleanExcerpt = cleanHtml(post.excerpt.rendered);
      const imageUrl = extractMajorImage(post);
      const postIdStr = String(post.id);

      if (existingLegacyIds.has(postIdStr) || existingTitles.has(cleanTitle.toLowerCase().trim())) {
        report.items.push({ id: post.id, title: cleanTitle, status: "skipped_exists" });
        report.skippedCount++;
        continue;
      }

      const authorName = post._embedded?.author?.[0]?.name || "EngageMedia Research Team";
      const pubDate = post.date ? post.date.substring(0, 10) : new Date().toISOString().substring(0, 10);
      const slug = generateSlug(cleanTitle);
      const classification = await classifyWithGemini(cleanTitle, cleanExcerpt);

      const airtablePayload = {
        records: [
          {
            fields: {
              "Title": cleanTitle,
              "Slug": slug,
              "Jurisdiction": classification.jurisdiction,
              "Category": classification.category,
              "Summary": classification.summary,
              "Source URL": post.link,
              "Source Name": "EngageMedia",
              "Published Date": pubDate,
              "Image URL": imageUrl || undefined,
              "Author": authorName,
              "Read Time": "4 min read",
              "Status": "published",
              "Threat Level": classification.threatLevel,
              "Legacy ID": postIdStr,
            }
          }
        ]
      };

      const res = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pat}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airtablePayload),
      });

      if (!res.ok) {
        const errText = await res.text();
        report.errors.push(`Post ID ${post.id} failed: ${errText}`);
        report.items.push({ id: post.id, title: cleanTitle, status: "error" });
      } else {
        report.newlyIngested++;
        report.items.push({ id: post.id, title: cleanTitle, status: "ingested" });
      }
    }
  } catch (err: unknown) {
    report.success = false;
    const msg = err instanceof Error ? err.message : String(err);
    report.errors.push(`Ingestion pipeline failed: ${msg}`);
  }

  return report;
}

export const syncEngageMediaContent = syncEngageMediaPosts;
