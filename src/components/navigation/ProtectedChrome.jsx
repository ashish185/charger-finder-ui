"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";
import BottomNav from "@/components/navigation/BottomNav";

const ChargeFinderHeader = ({ children }) => {
  const pathname = usePathname();
  const isCpoSection = pathname?.startsWith("/cpo");

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="border-b border-outline-variant/40 bg-surface-container-lowest">
        <div className="mx-auto flex max-w-sm items-center justify-between px-4 py-3">
          <Link href={isCpoSection ? "/cpo" : "/dashboard"} className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-lg">
              ⚡
            </span>
            <span className="text-sm font-semibold text-on-surface">
              ChargeFinder
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className={`flex-1 ${isCpoSection ? "" : "pb-24"}`}>
        {children}
      </main>

      {!isCpoSection && <BottomNav />}
    </div>
  );
};

export default ChargeFinderHeader;
