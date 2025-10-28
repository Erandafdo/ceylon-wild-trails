"use client";

import { useRouter, useParams } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { useSite } from "@/context/SiteContext";
import { useEffect, useState } from "react";
import { Article } from "@/data/articles";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const { articles, updateArticle } = useSite();

  // params.id is dynamic (string | string[] | undefined)
  const articleId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const existing = articles.find((a) => a.id === articleId);

  // Local editable form (string type for content)
  const [form, setForm] = useState<{
    title: string;
    author: string;
    coverImage: string;
    summary: string;
    publishedDate: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    if (!existing) {
      router.push("/admin/articles");
      return;
    }

    // Initialize form with existing article data
    setForm({
      title: existing.title,
      author: existing.author,
      coverImage: existing.coverImage,
      summary: existing.summary,
      publishedDate: existing.publishedDate,
      content: existing.content.join("\n"),
    });
  }, [existing, router]);

  if (!existing || !form) {
    return <div className="p-8 text-gray-600">Loading article...</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedArticle: Article = {
      ...existing,
      ...form,
      content: form.content
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    updateArticle(articleId as string, updatedArticle);
    alert("Article updated successfully!");
    router.push("/admin/articles");
  };

  return (
    <AdminLayout title={`Edit Article: ${existing.title}`}>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        {["title", "author", "coverImage", "summary", "publishedDate"].map(
          (key) => (
            <div key={key}>
              <label className="block text-sm font-medium capitalize mb-1">
                {key}
              </label>
              <input
                type={key === "publishedDate" ? "date" : "text"}
                name={key}
                value={(form as any)[key] || ""}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </div>
          )
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={8}
            className="border rounded w-full p-2"
            placeholder="Each paragraph on a new line"
          />
        </div>

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
