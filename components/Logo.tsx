import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/** Icon from public/logo-mark.png + the company name as live text (crisp, theme-aware, good for SEO). */
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.legalName} — home`} className={`inline-flex shrink-0 items-center gap-2 ${className}`}>
      <Image src="/logo-mark.png" alt="" width={361} height={240} priority={priority} className="h-8 w-auto min-[400px]:h-9 sm:h-11" />
      <span className="flex flex-col items-end leading-none">
        <span className="font-logo bg-gradient-to-r from-[#15803d] to-[#22a83a] bg-clip-text pb-0.5 text-[1.05rem] font-bold tracking-tight whitespace-nowrap text-transparent sm:text-2xl dark:from-[#4ade80] dark:to-[#86efac]">
          Green Arrow Solar
        </span>
        <span className="mt-0.5 text-[0.5rem] font-bold tracking-[0.22em] whitespace-nowrap text-[#15803d]/75 sm:text-[0.6rem] dark:text-[#86efac]/75">PVT. LTD.</span>
      </span>
    </Link>
  );
}
