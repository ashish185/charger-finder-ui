"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/app/auth/provider";
import { getPostAuthRoute } from "@/utils/auth";

// Hook form of getPostAuthRoute: pulls the current user and path from
// context/router so callers don't have to wire them up themselves.
export const usePostAuthRoute = () => {
  const { user } = useAuth();
  const pathName = usePathname();
  return getPostAuthRoute(user, pathName);
};
