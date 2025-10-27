"use client";

import { useRouter } from "next/navigation";
import { trails } from "@/data/trails";
import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";

export default function EditTrailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const existing = trails.find((t) => t.id === params.id);
  const [form, setForm] = useState(existing || {});

  if (!existing) {
    return <div className="p-8 text-red-600">Trail not found.</div>;
  }

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Trail updated successfully (demo only)");
    router.push("/admin/trails");
  };

  return (
    <AdminLayout title={`Edit: ${existing.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        {Object.keys(existing).map((key) => (
          key !== "id" && (
            <div key={key}>
              <label className="block text-sm font-medium capitalize mb-1">
                {key}
              </label>
              <input
                type="text"
                name={key}
                value={(form as any)[key] || ""}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </div>
          )
        ))}

        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Save Changes
        </button>
      </form>
    </AdminLayout>
  );
}
