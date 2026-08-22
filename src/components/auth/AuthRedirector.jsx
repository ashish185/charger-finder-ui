"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth/provider";
import { STATE } from "@/app/constants";
import { getPostAuthRoute } from "@/utils/auth";

export default function AuthRedirector() {
  const router = useRouter();
  const { user, userStatus } = useAuth();
  useEffect(() => {
    if (userStatus === STATE.LOADING) return;
    router.replace(getPostAuthRoute(user));
  }, [user, userStatus, router]);

  return null;
}
