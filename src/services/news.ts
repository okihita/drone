import { supabase } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import { generateSlug } from "@/lib/slug";
import type { NewsItem, NewsListItem, NewsCardItem, NewsDispatchItem } from "@/types";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Safely extract slug from a row — may be missing if migration hasn't run yet. */
function slugFrom(row: Record<string, unknown> | null, title?: string): string | null {
  return (row?.slug as string) || (title ? generateSlug(title) : null);
}

// ── Queries ──────────────────────────────────────────────────────────────────

export async function listNews(): Promise<NewsListItem[]> {
  const { data, error } = await supabase
    .from("news_items")
    .select("*")
    .order("published_date", { ascending: false });

  if (error) throw new Error(error.message);
  return ((data ?? []) as Record<string, unknown>[]).map((row) => ({
    id: row.id as string,
    title: row.title as string,
    slug: slugFrom(row),
    jurisdiction: row.jurisdiction as string,
    category: row.category as string,
    image_url: row.image_url as string | null,
    published_date: row.published_date as string,
  }));
}

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
  const row = data as Record<string, unknown> | null;
  if (!row) return null;
  return { ...row, slug: slugFrom(row, row.title as string) } as unknown as NewsItem;
}

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
    const row = data as Record<string, unknown> | null;
    if (!row) return null;
    return { ...row, slug: slugFrom(row, row.title as string) } as unknown as NewsItem;
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
    .order("published_date", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return ((data ?? []) as Record<string, unknown>[]).map((row) => ({
    id: row.id as string,
    title: row.title as string,
    slug: slugFrom(row),
    category: row.category as string,
    read_time: row.read_time as string | null,
    summary: row.summary as string,
    author: row.author as string | null,
    image_url: row.image_url as string | null,
  }));
}

export async function listDispatches(limit = 2): Promise<NewsDispatchItem[]> {
  const { data, error } = await supabase
    .from("news_items")
    .select("*")
    .order("published_date", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return ((data ?? []) as Record<string, unknown>[]).map((row) => ({
    id: row.id as string,
    title: row.title as string,
    slug: slugFrom(row),
    category: row.category as string,
    summary: row.summary as string,
    image_url: row.image_url as string | null,
  }));
}

// ── Mutations ────────────────────────────────────────────────────────────────

export async function uploadNewsImage(file: File): Promise<string> {
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
  const payload = { ...input };
  try {
    // If slug column exists, use it
    (payload as Record<string, unknown>).slug = input.slug || generateSlug(input.title);
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
      const { slug: _s, ...rest } = payload as Record<string, unknown>;
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
  patch: Partial<NewsItem>,
  client: SupabaseClient = supabase,
): Promise<void> {
  const payload = { ...patch };
  if (patch.title && !patch.slug) {
    (payload as Record<string, unknown>).slug = generateSlug(patch.title);
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

export { generateSlug };
