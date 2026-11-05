"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};
// Server snapshot is the build/render year; the browser corrects it to the visitor's current year.
const serverYear = new Date().getFullYear();

export function CopyrightYear() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => serverYear);
  return <>{year}</>;
}
