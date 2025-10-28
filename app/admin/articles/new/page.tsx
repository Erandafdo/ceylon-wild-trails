"use client";

import { useState } from "react";
import { useSite } from "@/context/SiteContext";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Article } from "@/data/articles";

export default function NewArticlePage() {
  const router = useRouter();
  const { addArticle } = useSite();

  const [form, setForm] = useState({
    title: "",
    author: "",
    coverImage: "",
    summary: "",
    publishedDate: new Date().toISOString().split("T")[0],
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newArticle: Article = {
      id: uuidv4(),
      title: form.title.trim(),
      slug: form.title.trim().toLowerCase().replace(/\s+/g, "-"),
      author: form.author,
      coverImage: form.coverImage,
      summary: form.summary,
      publishedDate: form.publishedDate,
      content: form.content
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    addArticle(newArticle);
    alert("Article added successfully!");
    router.push("/admin/articles");
  };

  return (
    <AdminLayout title="Add New Article">
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
                value={(form as any)[key]}
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
            rows={6}
            className="border rounded w-full p-2"
            placeholder="Write each paragraph on a new line"
          />
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Save Article
        </button>
      </form>
    </AdminLayout>
  );
}
