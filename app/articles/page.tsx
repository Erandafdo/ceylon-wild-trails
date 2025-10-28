"use client";

import { useSite } from "@/context/SiteContext";
import Link from "next/link";
import Image from "next/image";

export default function ArticlesPage() {
  const { articles, loading } = useSite();

  if (loading) return <p className="p-8 text-gray-600">Loading articles...</p>;

  return (
    <main className="max-w-6xl mx-auto py-12 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-green-900">Travel Articles</h1>

      {articles.length === 0 ? (
        <p>No articles yet. Add some in the Admin Dashboard.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((a) => (
            <div
              key={a.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                  {a.coverImage && a.coverImage.startsWith("http") ? (
                    <Image
                      src={a.coverImage}
                      alt={a.title}
                      fill
                      className="object-cover"
                    />
                  ) : a.coverImage && a.coverImage.startsWith("/") ? (
                    <Image
                      src={a.coverImage}
                      alt={a.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{a.title}</h2>
                <p className="text-sm text-gray-600 mb-3">{a.summary}</p>
                <Link
                  href={`/articles/${a.slug}`}
                  className="text-green-700 hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
