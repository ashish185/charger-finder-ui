"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth/provider";
import { STATE } from "@/app/constants";
import { getPostAuthRoute } from "@/utils/auth";
import { usePathname } from "next/navigation";

export default function AuthRedirector() {
  const router = useRouter();
  const { user, userStatus } = useAuth();
  const pathName = usePathname();
  useEffect(() => {
    if (userStatus === STATE.LOADING) return;
    const path = getPostAuthRoute(user);
    if (pathName === "/" && !path) {
      router.push(path);
    }
    else {
      router.replace(path);
    }

  }, [user, userStatus, router, pathName]);

  return null;
}
