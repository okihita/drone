import type { PolicyCategory } from "./policy";

/** Canonical news-item shape matching the Supabase `news_items` table. */
export interface NewsItem {
  id: string;
  title: string;
  jurisdiction: string;
  category: string;
  summary: string;
  source_url: string;
  source_name: string;
  image_url: string | null;
  author: string | null;
  read_time: string | null;
  slug: string | null;
  published_date: string;
  created_at?: string;
}

/** Narrowed view for listing components. */
export type NewsListItem = Pick<
  NewsItem,
  "id" | "title" | "slug" | "jurisdiction" | "category" | "image_url" | "published_date"
>;

/** Narrowed view for homepage carousel & editorial grid. */
export type NewsCardItem = Pick<
  NewsItem,
  "id" | "title" | "slug" | "category" | "summary" | "author" | "image_url" | "read_time"
>;

/** Narrowed view for editorial field dispatches. */
export type NewsDispatchItem = Pick<
  NewsItem,
  "id" | "title" | "slug" | "category" | "summary" | "image_url"
>;
