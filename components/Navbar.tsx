"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-6 py-4 bg-green-900 text-white">
      <div className="text-2xl font-bold tracking-wide">
        Ceylon Wild Trails
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
        <Link href="/">Home</Link>
        <Link href="/trails">Trails</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
