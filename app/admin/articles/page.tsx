"use client";

import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { useSite } from "@/context/SiteContext";

export default function AdminArticlesPage() {
  const { articles, deleteArticle } = useSite();

  return (
    <AdminLayout title="Manage Articles">
      <div className="flex justify-end mb-6">
        <Link
          href="/admin/articles/new"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          + Add Article
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-green-900 text-white">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Author</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{a.title}</td>
              <td className="p-3">{a.author}</td>
              <td className="p-3">{a.publishedDate}</td>
              <td className="p-3 flex gap-3">
                <Link
                  href={`/admin/articles/${a.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteArticle(a.id)}
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
