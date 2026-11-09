/** Soft pastel sky with slowly drifting colour blobs (pure CSS, theme-aware). Shared by the home hero and inner-page heroes. */
export function SkyBackdrop({ fade = true }: { fade?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="hero-blob absolute -top-[30%] right-[-10%] h-[80%] w-[60%] rounded-full blur-[90px]" style={{ background: "var(--hero-blob-a)" }} />
      <div className="hero-blob absolute top-[25%] left-[20%] h-[55%] w-[45%] rounded-full blur-[100px]" style={{ background: "var(--hero-blob-b)", animationDelay: "-6s" }} />
      <div className="hero-blob absolute bottom-[-30%] left-[-15%] h-[70%] w-[50%] rounded-full blur-[90px]" style={{ background: "var(--hero-blob-c)", animationDelay: "-12s" }} />
      {fade && <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }} />}
    </div>
  );
}
