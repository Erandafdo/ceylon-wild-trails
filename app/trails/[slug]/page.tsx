import { trails } from "@/data/trails";

interface TrailDetailPageProps {
  params: { slug: string };
}

export default function TrailDetailPage({ params }: TrailDetailPageProps) {
  const trail = trails.find((t) => t.slug === params.slug);

  if (!trail) {
    return (
      <div className="p-10 text-center text-red-600">
        <h2 className="text-2xl font-bold mb-3">Trail Not Found</h2>
        <p>Sorry, that trail does not exist.</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-12 max-w-4xl mx-auto">
      <img
        src={trail.coverImage}
        alt={trail.name}
        className="w-full h-[50vh] object-cover rounded-lg shadow"
      />

      <h1 className="text-3xl font-bold mt-8">{trail.name}</h1>
      <div className="text-gray-600 text-sm mt-2">
        {trail.province} Province • {trail.difficulty} • {trail.distanceKm} km •{" "}
        {trail.durationHours}
      </div>

      <p className="text-gray-800 leading-relaxed mt-6 whitespace-pre-line">
        {trail.fullDescription}
      </p>
    </div>
  );
}
