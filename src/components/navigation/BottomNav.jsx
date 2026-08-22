"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    label: "Home",
    href: "/dashboard",
    icon: (active) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Bookings",
    href: "/bookings",
    icon: (active) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M6 3h9l3 3v15H6z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 9h6M9 13h6M9 17h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: (active) => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1.6-3.6 5-5.5 8-5.5s6.4 1.9 8 5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-outline-variant bg-surface/95 px-4 pb-6 pt-2 shadow-sm backdrop-blur-md">
      {TABS.map((tab) => {
        const active = tab.href !== "#" && pathname?.startsWith(tab.href);
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`flex flex-col items-center justify-center gap-0.5 duration-200 active:scale-90 ${
              active
                ? "text-primary"
                : "text-secondary transition-opacity hover:opacity-80"
            }`}
          >
            {tab.icon(active)}
            <span className="text-[11px] font-semibold tracking-wide">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
