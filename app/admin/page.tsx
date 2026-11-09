import type { Metadata } from "next";
import { AdminApp } from "./admin-app";

export const metadata: Metadata = {
  title: "Admin",
  description: "Lead dashboard",
  robots: { index: false, follow: false },
  manifest: "/admin.webmanifest",
  appleWebApp: { capable: true, title: "GA Admin", statusBarStyle: "default" },
};

export default function AdminPage() {
  return <AdminApp />;
}
