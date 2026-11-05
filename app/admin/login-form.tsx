"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="card mx-auto mt-10 grid max-w-sm gap-4 p-6">
      <label className="grid gap-1 text-sm font-medium">
        Email
        <input name="email" type="email" required autoComplete="username" className="field" />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Password
        <input name="password" type="password" required autoComplete="current-password" className="field" />
      </label>
      {state?.error && (
        <p role="alert" className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
          {state.error}
        </p>
      )}
      <button disabled={pending} className="btn btn-primary">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
