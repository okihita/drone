import { notFound, redirect } from "next/navigation";
import { getNewsBySlug, getNewsById, listStories } from "@/services/news";
import { generateSlug } from "@/lib/text";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    const all = await listStories(100);
    const match = all.find((a) => generateSlug(a.title) === slug);
    if (match) article = await getNewsById(match.id);
  }

  // 3. Fallback: try UUID
  if (!article && isUuid(slug)) {
    article = await getNewsById(slug);
    if (article?.slug) {
      redirect(`/accountability/investigations/${article.slug}`);
    }
  }

  if (!article) notFound();

  const sanitized = DOMPurify.sanitize(article.summary || "");

  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full font-sans">
      <div className="mb-6">
        <Link
          href="/accountability/investigations"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-asean-yellow transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Investigations</span>
        </Link>
      </div>

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
              <span>{new Date(article.published_date).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </div>

      {/* Article Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
        {article.image_url && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[420px]"
            />
          </div>
        )}
        <div
          className="space-y-4"
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />
      </article>
    </main>
  );
}
