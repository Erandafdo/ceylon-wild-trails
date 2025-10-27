"use client";

import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { useSite } from "@/context/SiteContext";
import { useState, useEffect } from "react";
import { Trail } from "@/data/trails";

export default function EditTrailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { trails, updateTrail } = useSite();

  // find trail by id
  const existing = trails.find((t) => t.id === params.id);

  // local editable form state
  const [form, setForm] = useState<Trail | null>(null);

  // when page loads, set the form with existing trail data
  useEffect(() => {
    if (!existing) {
      // invalid id → go back to admin list
      router.push("/admin/trails");
    } else {
      setForm(existing);
    }
  }, [existing, router]);

  // while loading / redirecting / setting form
  if (!existing || !form) {
    return (
      <div className="p-8 text-gray-600">
        Loading trail data...
      </div>
    );
  }

  // handle field change in form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // distanceKm is numeric, keep that numeric if editing that field
    if (name === "distanceKm") {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // update context store
    updateTrail(params.id, form);

    alert("Trail updated successfully!");
    router.push("/admin/trails");
  };

  // keys we want to show/edit (and in what order)
  const editableFields: Array<keyof Trail> = [
    "name",
    "slug",
    "province",
    "difficulty",
    "distanceKm",
    "durationHours",
    "coverImage",
    "shortDescription",
    "fullDescription",
  ];

  return (
    <AdminLayout title={`Edit Trail: ${existing.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        {editableFields.map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium capitalize mb-1">
              {key}
            </label>

            {key === "shortDescription" || key === "fullDescription" ? (
              <textarea
                name={key}
                value={(form as any)[key] ?? ""}
                onChange={handleChange}
                className="border rounded w-full p-2"
                rows={key === "fullDescription" ? 4 : 2}
              />
            ) : (
              <input
                type={key === "distanceKm" ? "number" : "text"}
                name={key}
                value={(form as any)[key] ?? ""}
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
          Save Changes
        </button>
      </form>
    </AdminLayout>
  );
}
