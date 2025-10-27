import { trails } from "@/data/trails";
import { articles } from "@/data/articles";
import TrailCard from "@/components/TrailCard";
import ArticleCard from "@/components/ArticleCard";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <header className="relative">
        <img
          src="/images/hero.jpg"
          alt="Sri Lanka mountains"
          className="w-full h-[60vh] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Wild Trails of Sri Lanka
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Hike deeper. Find hidden waterfalls. Respect the land.
          </p>

          <a
            href="/trails"
            className="mt-6 bg-green-700 hover:bg-green-800 px-6 py-3 rounded font-semibold"
          >
            Explore Trails
          </a>
        </div>
      </header>

      {/* FEATURED TRAILS */}
      <section className="px-6 md:px-10 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Featured Trails
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {trails.slice(0, 3).map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="px-6 md:px-10 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Latest Articles
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.slice(0, 2).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
