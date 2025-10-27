import { articles } from "@/data/articles";

interface ArticleDetailPageProps {
  params: { slug: string };
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <div className="p-10 text-center text-red-600">
        <h2 className="text-2xl font-bold mb-3">Article Not Found</h2>
        <p>Sorry, that article does not exist.</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-12 max-w-3xl mx-auto">
      <img
        src={article.coverImage}
        alt={article.title}
        className="w-full h-[40vh] object-cover rounded-lg shadow"
      />

      <div className="text-xs text-gray-500 mt-6">
        {article.publishedDate} • {article.author}
      </div>

      <h1 className="text-3xl font-bold mt-2">{article.title}</h1>

      <p className="text-gray-700 mt-4 text-lg">{article.summary}</p>

      <div className="mt-8 space-y-6 text-gray-800 leading-relaxed">
        {article.content.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </div>
  );
}
