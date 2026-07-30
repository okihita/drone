import { supabase } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import { generateSlug } from "@/lib/text";
import type { NewsItem, NewsListItem, NewsCardItem, NewsDispatchItem } from "@/types";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Raw row shape returned by Supabase for news_items table. */
interface NewsRow {
  id: string;
  title: string;
  slug: string | null;
  jurisdiction: string | null;
  category: string | null;
  image_url: string | null;
  published_date: string | null;
  read_time: string | null;
  summary: string | null;
  author: string | null;
  source_url: string | null;
  source_name: string | null;
  status: string;
  wp_post_id: number | null;
  content: string | null;
  created_at: string;
}

/** Safely extract slug from a row — may be missing if migration hasn't run yet. */
function slugFrom(row: NewsRow | null, title?: string): string | null {
  return row?.slug ?? (title ? generateSlug(title) : null);
}

/** Map a raw Supabase row to a fully-typed NewsItem with safe defaults. */
function toNewsItem(row: NewsRow): NewsItem {
  const slug = slugFrom(row, row.title) ?? "";
  return {
    id: row.id,
    title: row.title,
    slug,
    jurisdiction: row.jurisdiction ?? "",
    category: (row.category ?? "") as NewsItem["category"],
    image_url: row.image_url ?? null,
    published_date: row.published_date ?? "",
    read_time: row.read_time ?? null,
    summary: row.summary ?? "",
    author: row.author ?? null,
    source_url: row.source_url ?? "",
    source_name: row.source_name ?? "",
    status: row.status as NewsItem["status"],
    wp_post_id: row.wp_post_id ?? undefined,
    created_at: row.created_at,
  };
}

// ── Queries ──────────────────────────────────────────────────────────────────

/** Fetch all published news items ordered by date descending. Used by admin listing. */
export async function listNews(): Promise<NewsListItem[]> {
  const { data, error } = await supabase
    .from("news_items")
    .select("*")
    .eq("status", "published")
    .order("published_date", { ascending: false });

  if (error) throw new Error(error.message);
  return ((data ?? []) as NewsRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    slug: slugFrom(row),
    jurisdiction: row.jurisdiction ?? "",
    category: (row.category ?? "") as NewsItem["category"],
    image_url: row.image_url,
    published_date: row.published_date ?? "",
  }));
}

/** Fetch a single news item by ID. Returns null if not found (handles PGRST116). */
export async function getNewsById(id: string): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from("news_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if ((error as { code?: string }).code === "PGRST116") return null;
    throw new Error(error.message);
  }
  const row = data as NewsRow | null;
  if (!row) return null;
  return toNewsItem(row);
}

/** Fetch a news item by URL slug. Returns null if not found or if slug column hasn't been migrated yet (42703). */
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const { data, error } = await supabase
      .from("news_items")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      if ((error as { code?: string }).code === "PGRST116") return null;
      throw error;
    }
    const row = data as NewsRow | null;
    if (!row) return null;
    return toNewsItem(row);
  } catch (err) {
    // Column "slug" may not exist yet — silently degrade, let caller fallback to UUID
    if ((err as { code?: string }).code === "42703") return null;
    throw err;
  }
}

export async function listStories(limit = 3): Promise<NewsCardItem[]> {
  const { data, error } = await supabase
    .from("news_items")
    .select("*")
    .eq("status", "published")
    .order("published_date", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return ((data ?? []) as NewsRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    slug: slugFrom(row),
    category: (row.category ?? "") as NewsItem["category"],
    read_time: row.read_time,
    summary: row.summary ?? "",
    author: row.author,
    image_url: row.image_url,
  }));
}

export async function listDispatches(limit = 2): Promise<NewsDispatchItem[]> {
  const { data, error } = await supabase
    .from("news_items")
    .select("*")
    .eq("status", "published")
    .order("published_date", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return ((data ?? []) as NewsRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    slug: slugFrom(row),
    category: (row.category ?? "") as NewsItem["category"],
    summary: row.summary ?? "",
    image_url: row.image_url,
  }));
}

// ── Mutations ────────────────────────────────────────────────────────────────

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

export async function uploadNewsImage(file: File): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`Unsupported image type: ${file.type}. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`);
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(`Image too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum: 5MB.`);
  }
  const path = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("news")
    .upload(path, file, { upsert: true });

  if (error) throw new Error(error.message);
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news/${data.path}`;
}

export async function createNewsItem(
  input: Omit<NewsItem, "id" | "created_at">,
  client: SupabaseClient = supabase,
): Promise<NewsItem> {
  const payload: Record<string, unknown> = { ...input };
  try {
    // If slug column exists, use it
    payload.slug = input.slug || generateSlug(input.title);
  } catch {
    // slug column doesn't exist — it'll be added by migration later
  }
  const { data, error } = await client
    .from("news_items")
    .insert(payload)
    .select()
    .single();

  if (error) {
    // If insert fails because slug column doesn't exist, retry without slug
    if ((error as { code?: string }).code === "42703") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { slug: _slug, ...rest } = payload;
      const { data: d2, error: e2 } = await client
        .from("news_items")
        .insert(rest)
        .select()
        .single();
      if (e2) throw new Error(e2.message);
      return d2 as NewsItem;
    }
    throw new Error(error.message);
  }
  return data as NewsItem;
}

export async function updateNewsItem(
  id: string,
  patch: Partial<Omit<NewsItem, "id" | "created_at">>,
  client: SupabaseClient = supabase,
): Promise<void> {
  const payload = { ...patch } as Record<string, unknown>;
  if (patch.title && !patch.slug) {
    payload.slug = generateSlug(patch.title);
  }
  const { error } = await client
    .from("news_items")
    .update(payload)
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteNewsItem(
  id: string,
  client: SupabaseClient = supabase,
): Promise<void> {
  const { error } = await client.from("news_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
}


