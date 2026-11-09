import type { Metadata } from "next";
import { AdminApp } from "./admin-app";

export const metadata: Metadata = {
  title: "Admin",
  description: "Lead dashboard",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
