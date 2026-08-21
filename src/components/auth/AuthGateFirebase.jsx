"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/app/auth/provider";
import { STATE } from "@/app/constants";

export default function AuthGateFireBase({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, userStatus } = useAuth();

    useEffect(() => {
        if (userStatus === STATE.LOADING) return;

        if (userStatus === STATE.ERROR || !user) {
            router.replace("/login");
        } else if (!user.role && pathname !== "/select-role") {
            router.replace("/select-role");
        }
    }, [userStatus, user, pathname, router]);

    if (userStatus === STATE.LOADING) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-surface">
                <p className="text-sm text-on-surface-variant">Loading…</p>
            </div>
        );
    }
    return children;
}
