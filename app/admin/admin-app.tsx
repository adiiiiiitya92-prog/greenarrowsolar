"use client";

import { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  type Timestamp,
} from "firebase/firestore";
import { auth, db, firebaseConfigured, type Lead, type LeadStatus } from "@/lib/firebase";

type Role = "admin" | "viewer";
type Session = { kind: "loading" } | { kind: "out" } | { kind: "denied"; user: User } | { kind: "in"; user: User; role: Role };

const STATUSES: LeadStatus[] = ["new", "contacted", "closed"];
const INTEREST: Record<string, string> = {
  residential: "Home rooftop",
  commercial: "Commercial",
  agriculture: "Solar pump",
  offgrid: "Off-grid / hybrid",
  other: "Other",
};

export function AdminApp() {
  const [session, setSession] = useState<Session>({ kind: "loading" });

  useEffect(() => {
    if (!firebaseConfigured) return;
    return onAuthStateChanged(auth(), async (user) => {
      if (!user) return setSession({ kind: "out" });
      try {
        const snap = await getDoc(doc(db(), "admins", user.uid));
        const role = snap.data()?.role;
        setSession(role === "admin" || role === "viewer" ? { kind: "in", user, role } : { kind: "denied", user });
      } catch {
        setSession({ kind: "denied", user });
      }
    });
  }, []);

  if (!firebaseConfigured)
    return (
      <Shell>
        <p className="card mx-auto max-w-lg p-6 text-sm">
          Firebase keys missing. Fill the <code>NEXT_PUBLIC_FIREBASE_*</code> values in <code>.env.local</code> (local) or in your
          hosting dashboard (Netlify / Cloudflare), then rebuild.
        </p>
      </Shell>
    );
  if (session.kind === "loading") return <Shell><div className="card mx-auto h-60 max-w-sm animate-pulse" /></Shell>;
  if (session.kind === "out") return <Shell><h1 className="text-center font-display text-3xl">Admin sign in</h1><LoginForm /></Shell>;
  if (session.kind === "denied")
    return (
      <Shell>
        <div className="card mx-auto grid max-w-md gap-3 p-6 text-sm">
          <h1 className="font-display text-2xl">Access not granted</h1>
          <p>
            <strong>{session.user.email}</strong> is signed in but is not on the staff list. Ask the owner to add a document in
            Firestore → <code>admins</code> with ID:
          </p>
          <code className="break-all rounded-lg bg-black/5 p-2 dark:bg-white/10">{session.user.uid}</code>
          <button className="btn btn-ghost" onClick={() => signOut(auth())}>Sign out</button>
        </div>
      </Shell>
    );
  return <Dashboard user={session.user} role={session.role} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="container-x py-12">{children}</div>;
}

function LoginForm() {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPending(true);
    setMsg(null);
    try {
      await signInWithEmailAndPassword(auth(), String(fd.get("email")).trim(), String(fd.get("password")));
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      setMsg({
        ok: false,
        text: code === "auth/too-many-requests" ? "Too many attempts. Try again in a few minutes." : "Invalid email or password.",
      });
    } finally {
      setPending(false);
    }
  }

  async function onReset(form: HTMLFormElement | null) {
    const email = String(new FormData(form ?? undefined).get("email") ?? "").trim();
    if (!email) return setMsg({ ok: false, text: "Enter your email above first." });
    try {
      await sendPasswordResetEmail(auth(), email);
    } catch {}
    setMsg({ ok: true, text: "If this email is registered, a password-reset link has been sent." });
  }

  return (
    <form onSubmit={onSubmit} className="card mx-auto mt-10 grid max-w-sm gap-4 p-6">
      <label className="grid gap-1 text-sm font-medium">
        Email
        <input name="email" type="email" required autoComplete="username" className="field" />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Password
        <input name="password" type="password" required autoComplete="current-password" className="field" />
      </label>
      {msg && (
        <p
          role="alert"
          className={`rounded-lg px-3 py-2 text-sm ${msg.ok ? "bg-brand-soft text-brand" : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200"}`}
        >
          {msg.text}
        </p>
      )}
      <button disabled={pending} className="btn btn-primary">{pending ? "Signing in…" : "Sign in"}</button>
      <button type="button" className="link text-sm" onClick={(e) => onReset(e.currentTarget.form)}>
        Forgot password?
      </button>
    </form>
  );
}

function Dashboard({ user, role }: { user: User; role: Role }) {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [q, setQ] = useState("");
  const isAdmin = role === "admin";

  useEffect(() => {
    const qy = query(collection(db(), "leads"), orderBy("createdAt", "desc"), limit(1000));
    return onSnapshot(
      qy,
      (snap) =>
        setLeads(
          snap.docs.map((d) => {
            const x = d.data({ serverTimestamps: "estimate" });
            return {
              id: d.id,
              name: x.name ?? "",
              phone: x.phone ?? "",
              email: x.email ?? "",
              city: x.city ?? "",
              interest: x.interest ?? "",
              monthlyBill: x.monthlyBill ?? null,
              message: x.message ?? "",
              page: x.page ?? "",
              status: x.status ?? "new",
              note: x.note ?? "",
              createdAt: (x.createdAt as Timestamp | undefined)?.toDate() ?? null,
            };
          }),
        ),
      (err) => setError(err.message),
    );
  }, []);

  const counts = useMemo(() => {
    const c = { all: 0, new: 0, contacted: 0, closed: 0 };
    for (const l of leads ?? []) {
      c.all++;
      c[l.status]++;
    }
    return c;
  }, [leads]);

  useEffect(() => {
    document.title = counts.new ? `(${counts.new}) New leads | Admin` : "Admin | Green Arrow Solar";
  }, [counts.new]);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (leads ?? []).filter(
      (l) =>
        (filter === "all" || l.status === filter) &&
        (!term || [l.name, l.phone, l.email, l.city, l.message].some((v) => v.toLowerCase().includes(term))),
    );
  }, [leads, filter, q]);

  return (
    <div className="container-x pt-[max(1.5rem,env(safe-area-inset-top))] pb-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Leads</h1>
          <p className="text-muted text-sm">
            {user.email} · role: <strong>{role}</strong>
            {!isAdmin && " (read-only)"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-ghost" disabled={!shown.length} onClick={() => downloadCsv(shown)}>Export CSV</button>
          <button className="btn btn-ghost" onClick={() => signOut(auth())}>Sign out</button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={filter === s}
            onClick={() => setFilter(s)}
            className={`btn !px-4 !py-1.5 ${filter === s ? "btn-primary" : "btn-ghost"}`}
          >
            {s} ({counts[s]})
          </button>
        ))}
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, phone, city…"
          aria-label="Search leads"
          className="field !py-1.5 min-w-0 flex-1 sm:max-w-xs"
        />
      </div>

      {error && <p role="alert" className="card mt-6 p-4 text-sm text-red-700 dark:text-red-300">{error}</p>}

      <div className="mt-6 grid gap-3">
        {leads === null && !error && <div className="card h-32 animate-pulse" />}
        {leads !== null && shown.length === 0 && <p className="card p-6">No enquiries here yet.</p>}
        {shown.map((l) => <LeadCard key={l.id} lead={l} isAdmin={isAdmin} />)}
      </div>
    </div>
  );
}

function LeadCard({ lead: l, isAdmin }: { lead: Lead; isAdmin: boolean }) {
  const [note, setNote] = useState(l.note);
  const [busy, setBusy] = useState(false);
  const ref = doc(db(), "leads", l.id);

  async function run(fn: () => Promise<unknown>) {
    setBusy(true);
    try {
      await fn();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="card grid gap-3 p-4 sm:grid-cols-[1fr_auto] sm:items-start">
      <div className="min-w-0 text-sm">
        <p className="text-base font-semibold">
          {l.name}{" "}
          <span className="text-muted font-normal">
            · {l.createdAt?.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) ?? "—"}
          </span>
        </p>
        <p className="flex flex-wrap gap-x-2">
          <a className="link" href={`tel:+91${l.phone}`}>{l.phone}</a>
          <a className="link" href={`https://wa.me/91${l.phone}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          {l.email && <a className="link break-all" href={`mailto:${l.email}`}>{l.email}</a>}
        </p>
        <p className="text-muted">
          {[l.city, INTEREST[l.interest] ?? l.interest, l.monthlyBill ? `Bill ₹${l.monthlyBill}` : null, l.page || null]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {l.message && <p className="mt-1 whitespace-pre-wrap break-words">{l.message}</p>}
        {isAdmin ? (
          <div className="mt-2 flex gap-2">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={2000}
              placeholder="Private note (e.g. called, visit on Monday)"
              aria-label="Note"
              className="field !py-1 min-w-0 flex-1"
            />
            {note !== l.note && (
              <button disabled={busy} className="btn btn-ghost !px-3 !py-1" onClick={() => run(() => updateDoc(ref, { note }))}>
                Save
              </button>
            )}
          </div>
        ) : (
          l.note && <p className="text-muted mt-1 italic">Note: {l.note}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {isAdmin ? (
          <>
            <select
              value={l.status}
              disabled={busy}
              onChange={(e) => run(() => updateDoc(ref, { status: e.target.value }))}
              className="field !py-1"
              aria-label="Lead status"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              disabled={busy}
              className="btn btn-ghost !px-3 !py-1 text-red-700 dark:text-red-300"
              onClick={() => confirm(`Delete lead from ${l.name}? This cannot be undone.`) && run(() => deleteDoc(ref))}
            >
              Delete
            </button>
          </>
        ) : (
          <span className="chip">{l.status}</span>
        )}
      </div>
    </article>
  );
}

function downloadCsv(rows: Lead[]) {
  const cols = ["createdAt", "name", "phone", "email", "city", "interest", "monthlyBill", "message", "status", "note", "page"] as const;
  // Prefix formula-like cells so spreadsheets don't execute them.
  const cell = (v: unknown) => {
    let s = v instanceof Date ? v.toISOString() : String(v ?? "");
    if (/^[=+\-@]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\r\n");
  const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: `leads-${new Date().toISOString().slice(0, 10)}.csv` });
  a.click();
  URL.revokeObjectURL(url);
}
