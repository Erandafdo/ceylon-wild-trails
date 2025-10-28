"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSite } from "@/context/SiteContext";
import AdminLayout from "@/components/AdminLayout";

// ✅ Trail interface
interface Trail {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  province: string;
  difficulty?: string;
  shortDescription?: string;
  coverImage?: string;
  description?: string;
  length_km?: number;
  time?: string;
  location?: string;
  [key: string]: any;
}

export default function EditTrailPage() {
  const { trails, updateTrail } = useSite();
  const params = useParams();
  const router = useRouter();

  // ✅ Extract id safely (Next.js 16 returns string | string[])
  const idParam: string | undefined = Array.isArray(params?.id)
    ? params.id[0]
    : (params?.id as string | undefined);

  // ✅ Local form state
  const [form, setForm] = useState<Trail | null>(null);

  // ✅ Load trail when id or trails change
  useEffect(() => {
    if (!idParam) return;

    const match = trails.find(
      (t: Trail) => t?._id === idParam || t?.id === idParam
    );
    if (match) setForm(match);
  }, [idParam, trails]);

  // ✅ Handle form input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) =>
      prev ? { ...prev, [e.target.name]: e.target.value } : prev
    );
  };

  // ✅ Handle form submission (this was missing!)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form) return;

    const trailId = form._id || form.id;
    if (!trailId) return;

    try {
      await updateTrail(trailId, form);
      router.push("/admin/trails");
    } catch (error) {
      console.error("Error updating trail:", error);
      alert("Failed to update trail. Check console for details.");
    }
  };

  // ✅ Show loading message if trail not yet loaded
  if (!form) {
    return (
      <div className="p-8 text-red-600 text-center">
        Loading trail data or trail not found...
      </div>
    );
  }

  // ✅ Render editable form
  return (
    <AdminLayout title={`Edit Trail: ${form.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        {Object.keys(form)
          .filter((key) => !["_id", "id", "__v"].includes(key))
          .map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium capitalize mb-1">
                {key}
              </label>
              <input
                type="text"
                name={key}
                value={form[key] ?? ""}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
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
