"use client";

import { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import { STATE } from "@/app/constants";
import { UserService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { getPostAuthRoute } from "@/utils/auth";

// Fetches the current user's profile on mount and redirects to the
// appropriate post-auth route once the fetch settles.
export function useAuthProfile() {
  const [user, setUser] = useState(null);
  const [userStatus, setUserStatus] = useState(STATE.LOADING);
  const pathName= usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      let fetchedUser = null;
      try {
        const response = await UserService.getProfile();
        fetchedUser = response?.user ?? response?.data ?? null;
        setUser(fetchedUser);
        setUserStatus(STATE.SUCCESS);
        const path = getPostAuthRoute(fetchedUser, pathName);
        router.replace(`/${path}`);
      } catch {
        setUser(null);
        setUserStatus(STATE.ERROR);
        router.replace("/login");
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, userStatus, setUser, setUserStatus };
}
