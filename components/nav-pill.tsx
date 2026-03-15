"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "~" },
  { href: "/notes", label: "notes" },
  { href: "/kraken", label: "kraken" },
  { href: "/manifest", label: "manifest" },
];

export function NavPill() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav className="fixed bottom-4 left-1/2 z-[200] flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-zinc-700/50 bg-zinc-900/80 p-1 shadow-lg shadow-black/20 backdrop-blur-md">
      {NAV_ITEMS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`cursor-pointer rounded-full px-3 py-1.5 font-mono text-xs transition-colors ${
            isActive(href)
              ? "bg-zinc-700 text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
