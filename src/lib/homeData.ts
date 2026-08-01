import { unstable_cache } from "next/cache";
import type { NewsCardItem, NewsDispatchItem } from "@/types/news";
import type { PolicyRadarEntry } from "@/types/policy";

const SUPABASE_AVAILABLE = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const cachedLeadStory = unstable_cache(
  async (): Promise<NewsCardItem | null> => {
    const { listStories } = await import("@/services/news");
    return (await listStories(1))[0] ?? null;
  },
  ["home-lead-story"],
  { revalidate: 3600, tags: ["home-news"] },
);

const cachedStories = unstable_cache(
  async (): Promise<NewsCardItem[]> => {
    const { listStories } = await import("@/services/news");
    return listStories(3);
  },
  ["home-stories"],
  { revalidate: 3600, tags: ["home-news"] },
);

const cachedDispatches = unstable_cache(
  async (): Promise<NewsDispatchItem[]> => {
    const { listDispatches } = await import("@/services/news");
    return listDispatches(3);
  },
  ["home-dispatches"],
  { revalidate: 3600, tags: ["home-news"] },
);

const cachedRadar = unstable_cache(
  async (): Promise<PolicyRadarEntry[]> => {
    const { listPolicyRadar } = await import("@/services/policies");
    return listPolicyRadar(3);
  },
  ["home-radar"],
  { revalidate: 3600, tags: ["home-policies"] },
);

export async function getHomeLeadStory(): Promise<NewsCardItem | null> {
  if (!SUPABASE_AVAILABLE) return null;
  return cachedLeadStory();
}

export async function getHomeStories(): Promise<NewsCardItem[]> {
  if (!SUPABASE_AVAILABLE) return [];
  return cachedStories();
}

export async function getHomeDispatches(): Promise<NewsDispatchItem[]> {
  if (!SUPABASE_AVAILABLE) return [];
  return cachedDispatches();
}

export async function getHomeRadar(): Promise<PolicyRadarEntry[]> {
  if (!SUPABASE_AVAILABLE) return [];
  return cachedRadar();
}
