"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="bg-green-900 text-white w-64 fixed top-0 bottom-0 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link
            href="/admin"
            className={`hover:bg-green-800 p-2 rounded ${
              path === "/admin" ? "bg-green-800" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/trails"
            className={`hover:bg-green-800 p-2 rounded ${
              path.startsWith("/admin/trails") ? "bg-green-800" : ""
            }`}
          >
            Manage Trails
          </Link>
          <Link
            href="/admin/articles"
            className={`hover:bg-green-800 p-2 rounded ${
              path.startsWith("/admin/articles") ? "bg-green-800" : ""
            }`}
          >
            Manage Articles
          </Link>
        </nav>
      </aside>

      <main className="md:ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        {children}
      </main>
    </div>
  );
}
