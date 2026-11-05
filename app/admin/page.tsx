import type { Metadata } from "next";
import { getUser } from "@/lib/auth";
import { db, type Lead } from "@/lib/db";
import { deleteLead, logout, setStatus } from "./actions";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin",
  description: "Lead dashboard",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getUser();
  if (!user)
    return (
      <div className="container-x py-20">
        <h1 className="text-center font-display text-3xl">Admin sign in</h1>
        <LoginForm />
      </div>
    );

  const leads = db.prepare("SELECT * FROM leads ORDER BY id DESC LIMIT 200").all() as unknown as Lead[];
  const isAdmin = user.role === "admin";

  return (
    <div className="container-x py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Leads ({leads.length})</h1>
          <p className="text-muted text-sm">
            Signed in as {user.email} · role: <strong>{user.role}</strong>
            {!isAdmin && " (read-only)"}
          </p>
        </div>
        <form action={logout}>
          <button className="btn btn-ghost">Sign out</button>
        </form>
      </div>

      <div className="mt-6 grid gap-3">
        {leads.length === 0 && <p className="card p-6">No enquiries yet.</p>}
        {leads.map((l) => (
          <article key={l.id} className="card grid gap-2 p-4 sm:grid-cols-[1fr_auto] sm:items-start">
            <div className="min-w-0 text-sm">
              <p className="text-base font-semibold">
                {l.name} <span className="text-muted font-normal">· {l.created_at} UTC</span>
              </p>
              <p>
                <a className="link" href={`tel:+91${l.phone}`}>{l.phone}</a>
                {l.email && (
                  <>
                    {" · "}
                    <a className="link" href={`mailto:${l.email}`}>{l.email}</a>
                  </>
                )}
              </p>
              <p className="text-muted">
                {[l.city, l.interest, l.monthly_bill ? `Bill ₹${l.monthly_bill}` : null].filter(Boolean).join(" · ")}
              </p>
              {l.message && <p className="mt-1 break-words">{l.message}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip">{l.status}</span>
              {isAdmin && (
                <>
                  <form action={setStatus} className="flex gap-1">
                    <input type="hidden" name="id" value={l.id} />
                    <select name="status" defaultValue={l.status} className="field !py-1" aria-label="Lead status">
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="closed">closed</option>
                    </select>
                    <button className="btn btn-ghost !px-3 !py-1">Save</button>
                  </form>
                  <form action={deleteLead}>
                    <input type="hidden" name="id" value={l.id} />
                    <button className="btn btn-ghost !px-3 !py-1 text-red-700 dark:text-red-300">Delete</button>
                  </form>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
