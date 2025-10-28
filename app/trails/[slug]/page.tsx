"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import Image from "next/image";
import dynamic from "next/dynamic";

// Lazy-load map to avoid "window is not defined"
const TrailMap = dynamic(() => import("@/components/TrailMap"), { ssr: false });

export default function TrailDetailPage() {
  const { trails, fetchTrails } = useSite();
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const [trail, setTrail] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;

    // Always get the latest data
    fetchTrails().then(() => {
      const found = trails.find((t) => t.slug === slug);
      if (found) setTrail(found);
      else {
        // fallback: fetch directly from API
        fetch(`http://localhost:4000/api/trails/slug/${slug}`)
          .then((r) => (r.ok ? r.json() : null))
          .then((d) => setTrail(d))
          .catch((e) => console.error("Error loading trail:", e));
      }
    });
  }, [slug]);

  if (!trail)
    return (
      <div className="text-center text-red-600 mt-16 text-lg">
        Trail not found or still loading…
      </div>
    );

  return (
    <main className="px-6 md:px-10 py-12">
      {trail.coverImage && (
        <div className="relative w-full h-[60vh] mb-10">
          <Image
            src={trail.coverImage}
            alt={trail.name}
            fill
            className="object-cover rounded-lg shadow-md"
          />
          <div className="absolute bottom-5 left-5 bg-black/60 text-white p-4 rounded">
            <h1 className="text-3xl font-bold">{trail.name}</h1>
            <p className="text-sm">
              {trail.location || "Unknown location"} • {trail.province}
            </p>
          </div>
        </div>
      )}

      <section className="bg-white p-6 rounded-lg shadow-sm mb-10">
        <h2 className="text-2xl font-semibold mb-4">Trail Information</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <p><strong>Difficulty:</strong> {trail.difficulty || "N/A"}</p>
          <p><strong>Trail Length:</strong> {trail.length_km || "N/A"} km</p>
          <p><strong>Time Required:</strong> {trail.time || "N/A"}</p>
          <p><strong>Province:</strong> {trail.province}</p>
        </div>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg shadow-sm mb-10">
        <h2 className="text-2xl font-semibold mb-4">Trail Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {trail.description ||
            trail.shortDescription ||
            "No description available."}
        </p>
      </section>

      {trail.coords && Array.isArray(trail.coords) && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Trail Location</h2>
          <TrailMap
            coords={trail.coords as [number, number]}
            name={trail.name}
            location={trail.location || trail.province}
          />
        </section>
      )}
    </main>
  );
}
