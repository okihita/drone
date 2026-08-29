import { notFound, redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getNewsBySlug, getNewsById, listStories } from "@/services/news";
import { generateSlug } from "@/lib/text";
import DOMPurify from "isomorphic-dompurify";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export default async function InvestigationPage({ params }: Props) {
  const { slug } = await params;

  // 1. Try slug lookup first
  let article = await getNewsBySlug(slug);

  // 2. Fallback: if slug column doesn't exist yet, match by generated title-slug
  if (!article && !isUuid(slug)) {
    // Fetch all articles and find the one whose title generates this slug
    const all = await listStories(100);
    const match = all.find((a) => generateSlug(a.title) === slug);
    if (match) article = await getNewsById(match.id);
  }

  // 3. Fallback: try UUID (backwards-compat with old share links)
  if (!article && isUuid(slug)) {
    article = await getNewsById(slug);
    if (article?.slug) {
      redirect(`/investigations/${article.slug}`);
    }
  }

  if (!article) notFound();

  const sanitized = DOMPurify.sanitize(article.summary || "");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans transition-colors">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        {/* Hidden element: AdminBar reads this to show "Edit Article" link */}
        <div id="drone-article-meta" data-article-id={article.id} className="hidden" />
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
          <span className="text-sm font-sans text-asean-yellow font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 mt-3 text-sm text-slate-500 dark:text-slate-400 font-sans">
            <span>By {article.author || "EngageMedia Research"}</span>
            {article.read_time && (
              <>
                <span>·</span>
                <span>{article.read_time}</span>
              </>
            )}
            {article.published_date && (
              <>
                <span>·</span>
                <span>
                  {new Date(article.published_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
          {article.jurisdiction && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-sans">
              {article.jurisdiction}
            </p>
          )}
        </div>

        <article
          className="prose-content font-sans"
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 font-sans">
          <p>
            <strong className="text-slate-700 dark:text-slate-300">Source:</strong>{" "}
            <a
              href={article.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-asean-blue hover:underline"
            >
              {article.source_name || article.source_url}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
