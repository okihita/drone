import { fetchAirtableTable } from "./airtableClient";
import { generateSlug } from "@/lib/text";
import type { NewsItem, NewsListItem, NewsCardItem, NewsDispatchItem } from "@/types";

interface NewsFields {
  "Title"?: string;
  "Slug"?: string;
  "Jurisdiction"?: string;
  "Category"?: string;
  "Summary"?: string;
  "Source URL"?: string;
  "Source Name"?: string;
  "Published Date"?: string;
  "Image URL"?: string;
  "Author"?: string;
  "Read Time"?: string;
  "Status"?: string;
  "Legacy ID"?: string;
}

function toNewsItem(r: { id: string; fields: NewsFields; createdTime?: string }): NewsItem {
  const f = r.fields;
  const title = f["Title"] || "";
  const slug = f["Slug"] || generateSlug(title);
  return {
    id: f["Legacy ID"] || r.id,
    title,
    slug,
    jurisdiction: f["Jurisdiction"] || "",
    category: (f["Category"] || "DATA GOVERNANCE") as NewsItem["category"],
    image_url: f["Image URL"] || null,
    published_date: f["Published Date"] || "",
    read_time: f["Read Time"] || null,
    summary: f["Summary"] || "",
    author: f["Author"] || "EngageMedia Research Team",
    source_url: f["Source URL"] || "",
    source_name: f["Source Name"] || "",
    status: (f["Status"] || "published") as NewsItem["status"],
    created_at: r.createdTime || new Date().toISOString(),
  };
}

async function getAllNews(): Promise<NewsItem[]> {
  const tableName = process.env.AIRTABLE_NEWS_TABLE || "News";
  const records = await fetchAirtableTable<NewsFields>(tableName, { tag: "news" });
  return records
    .map(toNewsItem)
    .filter((n) => n.status === "published" && n.title)
    .sort((a, b) => b.published_date.localeCompare(a.published_date));
}

/** Fetch all published news items ordered by date descending. */
export async function listNews(): Promise<NewsListItem[]> {
  const news = await getAllNews();
  return news.map((n) => ({
    id: n.id,
    title: n.title,
    slug: n.slug,
    jurisdiction: n.jurisdiction,
    category: n.category,
    image_url: n.image_url,
    published_date: n.published_date,
  }));
}

/** Fetch a single news item by ID (matches legacy UUID or Airtable record ID). */
export async function getNewsById(id: string): Promise<NewsItem | null> {
  const news = await getAllNews();
  return news.find((n) => n.id === id) ?? null;
}

/** Fetch a news item by URL slug. */
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const news = await getAllNews();
  return news.find((n) => n.slug === slug) ?? null;
}

/** Fetch top N stories for featured grid. */
export async function listStories(limit = 3): Promise<NewsCardItem[]> {
  const news = await getAllNews();
  return news.slice(0, limit).map((n) => ({
    id: n.id,
    title: n.title,
    slug: n.slug,
    category: n.category,
    read_time: n.read_time,
    summary: n.summary,
    author: n.author,
    image_url: n.image_url,
  }));
}

/** Fetch top N dispatches for editorial column. */
export async function listDispatches(limit = 2): Promise<NewsDispatchItem[]> {
  const news = await getAllNews();
  return news.slice(0, limit).map((n) => ({
    id: n.id,
    title: n.title,
    slug: n.slug,
    category: n.category,
    summary: n.summary,
    image_url: n.image_url,
  }));
}
