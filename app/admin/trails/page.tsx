"use client";

import { useState } from "react";
import { trails as initialTrails, Trail } from "@/data/trails";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";

export default function AdminTrailsPage() {
  const [trails, setTrails] = useState<Trail[]>(initialTrails);

  const handleDelete = (id: string) => {
    if (confirm("Delete this trail?")) {
      setTrails(trails.filter((t) => t.id !== id));
    }
  };

  return (
    <AdminLayout title="Manage Trails">
      <div className="flex justify-end mb-6">
        <Link
          href="/admin/trails/new"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          + Add Trail
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-green-900 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Province</th>
            <th className="p-3 text-left">Difficulty</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trails.map((t) => (
            <tr key={t.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{t.name}</td>
              <td className="p-3">{t.province}</td>
              <td className="p-3">{t.difficulty}</td>
              <td className="p-3 flex gap-3">
                <Link
                  href={`/admin/trails/${t.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
