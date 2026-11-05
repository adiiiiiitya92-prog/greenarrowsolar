import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/** Icon from public/logo-mark.png + the brand name as live text (crisp, theme-aware, good for SEO). */
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className={`inline-flex shrink-0 items-center gap-2 ${className}`}>
      <Image src="/logo-mark.png" alt="" width={284} height={240} priority={priority} className="h-8 w-auto min-[400px]:h-9 sm:h-11" />
      <span className="font-display text-[1.05rem] leading-none font-bold tracking-tight whitespace-nowrap sm:text-2xl">
        <span className="text-brand">Green Arrow</span> <span className="text-accent-text">Solar</span>
      </span>
    </Link>
  );
}
