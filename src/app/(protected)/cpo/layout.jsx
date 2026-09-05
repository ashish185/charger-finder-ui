"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/app/auth/provider";
import { ROLE, STATE } from "@/app/constants";

const CpoLayout = ({ children }) => {
  const { user, userStatus } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const roles = Array.isArray(user?.role) ? user.role : user?.role ? [user.role] : [];
  const isOperator = roles.includes(ROLE.OPERATOR);

  useEffect(() => {
    if (userStatus === STATE.SUCCESS && !isOperator) {
      router.replace("/dashboard");
    }
  }, [userStatus, isOperator, router]);

  if (!isOperator) return null;

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
