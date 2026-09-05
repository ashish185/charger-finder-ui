"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CpoLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-sm px-4 py-4">
      <nav className="mb-4 flex items-center gap-4 border-b border-outline-variant/40 pb-3 text-sm font-semibold">
        <Link
          href="/cpo"
          className={pathname === "/cpo" ? "text-primary" : "text-on-surface-variant"}
        >
          Stations
        </Link>
        <Link
          href="/cpo/stations/new"
          className={pathname === "/cpo/stations/new" ? "text-primary" : "text-on-surface-variant"}
        >
          + New station
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default CpoLayout;
