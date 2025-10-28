"use client";

import { useEffect } from "react";
import { useSite } from "@/context/SiteContext";
import Link from "next/link";
import Image from "next/image";

export default function TrailsPage() {
  const { trails, fetchTrails } = useSite();

  // load fresh data from backend when page mounts
  useEffect(() => {
    fetchTrails();
  }, [fetchTrails]);

  // simple fallback UI if nothing loaded yet
  if (!trails || trails.length === 0) {
    return (
      <main className="max-w-6xl mx-auto py-12 px-4 md:px-0">
        <h1 className="text-3xl font-bold mb-8 text-green-900">
          Hiking Trails
        </h1>
        <p className="text-gray-600">
          No trails found. Add some in the Admin Dashboard.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-green-900">
        Hiking Trails
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {trails.map((trail: any) => (
          <div
            key={trail._id ?? trail.id ?? trail.slug}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            {/* Image block */}
            <div className="relative h-48 bg-gray-100 flex items-center justify-center">
              {trail.coverImage ? (
                <Image
                    src={trail.coverImage}
                    alt={trail.name}
                    fill
                    className="object-cover"
                    unoptimized
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>

            {/* Content block */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{trail.name}</h2>
              <p className="text-sm text-gray-600 mb-3">
                {trail.shortDescription || "No description yet."}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                {trail.province || "Unknown province"}
              </p>

              <Link
                href={`/trails/${trail.slug}`}
                className="text-green-700 hover:underline text-sm font-medium"
              >
                View Trail →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
