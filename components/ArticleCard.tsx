import Link from "next/link";
import { Article } from "@/data/articles";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="rounded-lg overflow-hidden shadow bg-white hover:shadow-lg transition">
      <img
        src={article.coverImage}
        alt={article.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <div className="text-xs text-gray-500">
          {article.publishedDate} • {article.author}
        </div>

        <h3 className="text-lg font-bold mt-1">{article.title}</h3>

        <p className="text-sm text-gray-700 mt-2 line-clamp-3">
          {article.summary}
        </p>

        <Link
          href={`/articles/${article.slug}`}
          className="text-green-700 font-medium inline-block mt-4"
        >
          Read Article →
        </Link>
      </div>
    </div>
  );
}
