"use client";

import { useParams } from "next/navigation";
import { useSite } from "@/context/SiteContext";
import Image from "next/image";

export default function TrailDetailPage() {
  const { trails, loading } = useSite();
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  if (loading) return <div className="p-8 text-gray-600">Loading trail...</div>;

  const trail = trails.find((t) => t.slug === slug);

  if (!trail)
    return (
      <div className="p-8 text-red-600 text-center">Trail not found.</div>
    );

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 md:px-0">
      <div className="relative w-full h-[50vh] mb-8 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={trail.coverImage}
          alt={trail.name}
          fill
          className="object-cover"
        />
      </div>

      <h1 className="text-4xl font-bold mb-3">{trail.name}</h1>
      <p className="text-gray-600 mb-2">
        {trail.province} — Difficulty: {trail.difficulty}
      </p>
      <p className="text-gray-700 italic mb-8">{trail.shortDescription}</p>

      <p className="text-gray-800 leading-relaxed">{trail.fullDescription}</p>
    </main>
  );
}
