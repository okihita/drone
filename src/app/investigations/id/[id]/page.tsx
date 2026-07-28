import { notFound, redirect } from "next/navigation";
import { getNewsById } from "@/services/news";

interface Props {
  params: Promise<{ id: string }>;
}

/** Canonical UUID-based redirect — issues 301 to slug URL. */
export default async function InvestigationIdRedirect({ params }: Props) {
  const { id } = await params;
  const article = await getNewsById(id);

  if (article?.slug) {
    redirect(`/investigations/${article.slug}`);
  }

  notFound();
}
