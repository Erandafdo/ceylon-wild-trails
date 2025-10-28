"use client";

import Link from "next/link";
import Image from "next/image";
import { useSite } from "@/context/SiteContext";

export default function TrailsPage() {
  const { trails, loading } = useSite();

  if (loading) return <p className="p-8 text-gray-600">Loading trails...</p>;

  return (
    <main className="max-w-6xl mx-auto py-12 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-green-900">Hiking Trails</h1>

      {trails.length === 0 ? (
        <p>No trails found. Add some in the Admin Dashboard.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {trails.map((trail) => (
            <div
              key={trail.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={trail.coverImage}
                  alt={trail.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{trail.name}</h2>
                <p className="text-sm text-gray-600 mb-3">
                  {trail.shortDescription}
                </p>
                <Link
                  href={`/trails/${trail.slug}`}
                  className="text-green-700 hover:underline"
                >
                  View Trail →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
