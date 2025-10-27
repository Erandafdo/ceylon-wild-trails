import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SiteProvider } from "@/context/SiteContext";

export const metadata: Metadata = {
  title: "Ceylon Wild Trails",
  description: "Sri Lankan hiking trails, waterfalls, and wild paths.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <SiteProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
