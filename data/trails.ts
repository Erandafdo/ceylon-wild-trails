export interface Trail {
  id: string;
  name: string;
  slug: string;
  province: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  distanceKm: number;
  durationHours: string;
  coverImage: string;
  shortDescription: string;
  fullDescription: string;
}

export const trails: Trail[] = [
  {
    id: "trail_001",
    name: "Ella Rock",
    slug: "ella-rock",
    province: "Uva",
    difficulty: "Moderate",
    distanceKm: 8.5,
    durationHours: "3-4 hours",
    coverImage: "/images/ella-rock.jpg",
    shortDescription:
      "Scenic hike through tea estates with insane views over Ella Gap.",
    fullDescription:
      "Ella Rock is one of Sri Lanka’s most popular viewpoints. The hike starts near Ella railway and goes through tea plantations, village paths, and then a steep final climb. Best done early morning for clear views and lower heat."
  },
  {
    id: "trail_002",
    name: "Hanthana Mountain Range",
    slug: "hanthana",
    province: "Central",
    difficulty: "Hard",
    distanceKm: 10,
    durationHours: "5 hours",
    coverImage: "/images/hanthana.jpg",
    shortDescription:
      "Kandy’s legendary ridge hike. Wind, mist, and full hill country panorama.",
    fullDescription:
      "Hanthana is loved by Sri Lankan uni students and hikers. Expect long ridgelines, loose rock in some places, and strong sun exposure. Carry water. Avoid bad weather days because lightning is common in the evenings."
  }
];
