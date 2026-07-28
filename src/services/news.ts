import { supabase } from "@/lib/supabase";
import type { NewsItem, NewsListItem, NewsCardItem, NewsDispatchItem } from "@/types";

// ── Queries ──────────────────────────────────────────────────────────────────

export async function listNews(): Promise<NewsListItem[]> {
  const { data, error } = await supabase
    .from("news_items")
    .select("id,title,jurisdiction,category,image_url,published_date")
    .order("published_date", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as NewsListItem[]) ?? [];
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from("news_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return (data as NewsItem) ?? null;
}

/** Fetch stories for the featured carousel (top 3). */
export async function listStories(limit = 3): Promise<NewsCardItem[]> {
  const { data, error } = await supabase
    .from("news_items")
    .select("id,title,category,read_time,summary,author,image_url")
    .order("published_date", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data as NewsCardItem[]) ?? [];
}

/** Fetch dispatches for the editorial grid (top 2). */
export async function listDispatches(limit = 2): Promise<NewsDispatchItem[]> {
  const { data, error } = await supabase
    .from("news_items")
    .select("id,title,category,summary,image_url")
    .order("published_date", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data as NewsDispatchItem[]) ?? [];
}

// ── Mutations ────────────────────────────────────────────────────────────────

export async function uploadNewsImage(
  file: File,
): Promise<string> {
  const path = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("news")
    .upload(path, file, { upsert: true });

  if (error) throw new Error(error.message);
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news/${data.path}`;
}

export async function createNewsItem(
  input: Omit<NewsItem, "id" | "created_at">,
): Promise<NewsItem> {
  const { data, error } = await supabase
    .from("news_items")
    .insert(input)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as NewsItem;
}

export async function updateNewsItem(
  id: string,
  patch: Partial<NewsItem>,
): Promise<void> {
  const { error } = await supabase
    .from("news_items")
    .update(patch)
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteNewsItem(id: string): Promise<void> {
  const { error } = await supabase.from("news_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
