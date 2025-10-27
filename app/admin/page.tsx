import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";

export default function AdminHome() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid sm:grid-cols-2 gap-6">
        <Link
          href="/admin/trails"
          className="p-6 bg-white shadow rounded hover:shadow-md transition"
        >
          <h2 className="text-xl font-bold mb-2 text-green-800">Trails</h2>
          <p>View, edit, or add hiking trails.</p>
        </Link>

        <Link
          href="/admin/articles"
          className="p-6 bg-white shadow rounded hover:shadow-md transition"
        >
          <h2 className="text-xl font-bold mb-2 text-green-800">Articles</h2>
          <p>Manage blog articles and guides.</p>
        </Link>
      </div>
    </AdminLayout>
  );
}
