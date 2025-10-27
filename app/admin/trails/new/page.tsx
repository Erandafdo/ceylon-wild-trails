"use client";

import { useState } from "react";
import { useSite } from "@/context/SiteContext";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Trail } from "@/data/trails";

export default function NewTrailPage() {
  const router = useRouter();
  const { addTrail } = useSite();

  // form state: every field typed properly
  const [form, setForm] = useState({
    name: "",
    province: "",
    difficulty: "",
    distanceKm: "",
    durationHours: "",
    coverImage: "",
    shortDescription: "",
    fullDescription: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // convert to Trail type properly
    const newTrail: Trail = {
      id: uuidv4(),
      name: form.name.trim(),
      slug: form.name.trim().toLowerCase().replace(/\s+/g, "-"),
      province: form.province,
      difficulty: form.difficulty as "Easy" | "Moderate" | "Hard",
      distanceKm: Number(form.distanceKm),
      durationHours: form.durationHours,
      coverImage: form.coverImage,
      shortDescription: form.shortDescription,
      fullDescription: form.fullDescription,
    };

    addTrail(newTrail);
    alert("Trail added successfully!");
    router.push("/admin/trails");
  };

  return (
    <AdminLayout title="Add New Trail">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium capitalize mb-1">
              {key}
            </label>
            {key.includes("Description") ? (
              <textarea
                name={key}
                value={(form as any)[key]}
                onChange={handleChange}
                className="border rounded w-full p-2"
                rows={key === "fullDescription" ? 4 : 2}
              />
            ) : (
              <input
                type={key === "distanceKm" ? "number" : "text"}
                name={key}
                value={(form as any)[key]}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Save Trail
        </button>
      </form>
    </AdminLayout>
  );
}
