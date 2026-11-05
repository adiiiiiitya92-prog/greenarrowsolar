"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, destroySession, requireRole, verifyPassword } from "@/lib/auth";
import { db, type User } from "@/lib/db";
import { clientIp, rateLimit } from "@/lib/ratelimit";

// Constant-ish work even when the user does not exist (avoids user enumeration by timing).
const DUMMY = "00000000000000000000000000000000:" + "0".repeat(128);

export async function login(_: { error?: string } | undefined, form: FormData) {
  const ip = clientIp(await headers());
  const rl = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
  if (!rl.ok) return { error: "Too many attempts. Try again in a few minutes." };

  const email = String(form.get("email") ?? "").trim().toLowerCase().slice(0, 120);
  const password = String(form.get("password") ?? "").slice(0, 200);
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as User | undefined;
  const ok = verifyPassword(password, user?.password_hash ?? DUMMY);
  if (!user || !ok) return { error: "Invalid email or password." };

  await createSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin");
}

export async function setStatus(form: FormData) {
  await requireRole("admin");
  const id = Number(form.get("id"));
  const status = String(form.get("status"));
  if (!Number.isInteger(id) || !["new", "contacted", "closed"].includes(status)) return;
  db.prepare("UPDATE leads SET status = ? WHERE id = ?").run(status, id);
  revalidatePath("/admin");
}

export async function deleteLead(form: FormData) {
  await requireRole("admin");
  const id = Number(form.get("id"));
  if (!Number.isInteger(id)) return;
  db.prepare("DELETE FROM leads WHERE id = ?").run(id);
  revalidatePath("/admin");
}
