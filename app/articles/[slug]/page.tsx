"use client";

import { useParams } from "next/navigation";
import { useSite } from "@/context/SiteContext";
import Image from "next/image";

export default function ArticleDetailPage() {
  const { articles, loading } = useSite();
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  if (loading) return <div className="p-8 text-gray-600">Loading...</div>;

  const article = articles.find((a) => a.slug === slug);
  if (!article)
    return <div className="p-8 text-red-600 text-center">Article not found.</div>;

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 md:px-0">
      <div className="relative w-full h-[50vh] mb-8 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      <h1 className="text-4xl font-bold mb-3">{article.title}</h1>
      <p className="text-gray-600 mb-2">
        By {article.author} — {article.publishedDate}
      </p>
      <p className="text-gray-700 italic mb-8">{article.summary}</p>

      <article className="prose prose-green max-w-none">
        {article.content.map((p, i) => (
          <p key={i} className="mb-4 text-gray-800 leading-relaxed">
            {p}
          </p>
        ))}
      </article>
    </main>
  );
}
