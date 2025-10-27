import { articles } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";

export default function ArticlesPage() {
  return (
    <div className="px-6 md:px-10 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Articles & Guides
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
