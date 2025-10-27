import Link from "next/link";
import { Trail } from "@/data/trails";

export default function TrailCard({ trail }: { trail: Trail }) {
  return (
    <div className="rounded-lg overflow-hidden shadow bg-white hover:shadow-lg transition">
      <img
        src={trail.coverImage}
        alt={trail.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold">{trail.name}</h3>
        <p className="text-sm text-gray-600">{trail.province} Province</p>

        <div className="text-xs mt-2 flex flex-wrap gap-3">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
            {trail.difficulty}
          </span>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {trail.distanceKm} km • {trail.durationHours}
          </span>
        </div>

        <p className="text-sm text-gray-700 mt-3 line-clamp-3">
          {trail.shortDescription}
        </p>

        <Link
          href={`/trails/${trail.slug}`}
          className="text-green-700 font-medium inline-block mt-4"
        >
          View Trail →
        </Link>
      </div>
    </div>
  );
}
