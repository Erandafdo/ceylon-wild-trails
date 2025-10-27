"use client";

import { useState } from "react";
import { trails } from "@/data/trails";
import TrailCard from "@/components/TrailCard";

export default function TrailsPage() {
  const [search, setSearch] = useState("");

  const filtered = trails.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-6 md:px-10 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        All Trails
      </h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search trails..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
        />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.map((trail) => (
          <TrailCard key={trail.id} trail={trail} />
        ))}
      </div>
    </div>
  );
}
