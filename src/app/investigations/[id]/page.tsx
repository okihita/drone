import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNewsById } from "@/services/news";
import DOMPurify from "isomorphic-dompurify";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function InvestigationPage({ params }: Props) {
  const { id } = await params;

  let article;
  try {
    article = await getNewsById(id);
  } catch {
    notFound();
  }
  if (!article) notFound();

  const sanitized = DOMPurify.sanitize(article.summary || "");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans transition-colors">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        {/* Meta */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
          <span className="text-xs font-sans text-asean-yellow font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 mt-3 text-xs text-slate-500 dark:text-slate-400 font-sans">
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
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">
              {article.jurisdiction}
            </p>
          )}
        </div>

        {/* Article Body */}
        <article
          className="prose prose-slate dark:prose-invert prose-sm sm:prose-base max-w-none font-sans"
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />

        {/* Source Attribution */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-sans">
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
