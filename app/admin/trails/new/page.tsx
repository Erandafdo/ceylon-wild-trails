"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/navigation";

export default function NewTrailPage() {
  const router = useRouter();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Trail added successfully (demo only)");
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
            {key === "shortDescription" || key === "fullDescription" ? (
              <textarea
                name={key}
                value={(form as any)[key]}
                onChange={handleChange}
                className="border rounded w-full p-2"
                rows={key === "fullDescription" ? 4 : 2}
              />
            ) : (
              <input
                type="text"
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
