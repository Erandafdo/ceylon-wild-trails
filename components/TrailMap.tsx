"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

interface TrailMapProps {
  coords: [number, number];
  name: string;
  location?: string;
}

export default function TrailMap({ coords, name, location }: TrailMapProps) {
  useEffect(() => {
    // ✅ dynamically import leaflet only in browser
    const loadMap = async () => {
      const L = await import("leaflet");

      // remove any existing map before re-render
      const existing = L.DomUtil.get("trail-map");
      if (existing) existing.remove();

      const map = L.map("trail-map").setView(coords, 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const marker = L.marker(coords).addTo(map);
      marker.bindPopup(`<b>${name}</b><br>${location || ""}`);

      // cleanup
      return () => {
        map.remove();
      };
    };

    loadMap();
  }, [coords, name, location]);

  return (
    <div
      id="trail-map"
      className="w-full h-[400px] rounded-lg shadow"
      style={{ zIndex: 0 }}
    ></div>
  );
}
