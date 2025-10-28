"use client";

import { useParams, useRouter } from "next/navigation";
import { useSite } from "@/context/SiteContext";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ArticleDetailPage() {
  const { articles, trails } = useSite();
  const router = useRouter();
  const params = useParams();

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const article = articles.find((a) => a.slug === slug);

  // redirect if article not found
  useEffect(() => {
    if (!article) router.push("/articles");
  }, [article, router]);

  if (!article) {
    return <div className="p-8 text-center text-red-600">Loading...</div>;
  }

  // optional: find related trail
  const relatedTrail = trails.find((t) =>
    article.title.toLowerCase().includes(t.name.toLowerCase())
  );

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 md:px-0">
      {/* Cover Image */}
      <div className="relative w-full h-[50vh] mb-8 rounded-lg overflow-hidden shadow-lg">
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-gray-200 h-full flex items-center justify-center text-gray-500">
            No image available
          </div>
        )}
      </div>

      {/* Article Info */}
      <h1 className="text-4xl font-bold mb-3">{article.title}</h1>
      <p className="text-gray-600 mb-2">
        By <span className="font-semibold">{article.author}</span> —{" "}
        <span>{article.publishedDate}</span>
      </p>
      <p className="text-gray-700 italic mb-8">{article.summary}</p>

      {/* Content */}
      <article className="prose prose-green max-w-none">
        {article.content.map((paragraph, i) => (
          <p key={i} className="mb-4 text-gray-800 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </article>

      {/* Related Trail */}
      {relatedTrail && (
        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            Related Trail
          </h2>
          <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col sm:flex-row">
            <img
              src={relatedTrail.coverImage}
              alt={relatedTrail.name}
              className="w-full sm:w-1/3 object-cover"
            />
            <div className="p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {relatedTrail.name}
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  {relatedTrail.shortDescription}
                </p>
              </div>
              <Link
                href={`/trails/${relatedTrail.slug}`}
                className="text-green-700 font-medium hover:underline"
              >
                View Trail →
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
