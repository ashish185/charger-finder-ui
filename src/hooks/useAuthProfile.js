"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { STATE } from "@/app/constants";
import { UserService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { getPostAuthRoute } from "@/utils/auth";

const PROFILE_QUERY_KEY = ["authProfile"];

const fetchProfile = async () => {
  const response = await UserService.getProfile();
  return response?.user ?? response?.data ?? null;
}

// Fetches the current user's profile on mount and redirects to the
// appropriate post-auth route once the fetch settles.
export const useAuthProfile = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, status, isSuccess, isError } = useQuery({
    queryKey: PROFILE_QUERY_KEY, // cache identifier shared by any consumer of this query
    queryFn: fetchProfile, // fetcher; its return becomes `data`, a throw sets `error` status

    staleTime: 5 * 60 * 1000, // data is "fresh" for 5 min — no auto refetch while fresh
    gcTime: 10 * 60 * 1000, // unused cache entry is garbage-collected after 10 min idle

    retry: 0, // retry a failed fetch up to 3 times before settling into error status
    refetchOnWindowFocus: false, // don't refetch just because the tab regained focus
  });

  const userStatus =
    status === "pending" ? STATE.LOADING : status === "success" ? STATE.SUCCESS : STATE.ERROR;

  // useEffect(() => {
  //   if (isSuccess) {
  //     const path = getPostAuthRoute(user, currentPath);
  //     console.log("path", user);
  //     router.replace(path);
  //   } else if (isError) {
  //     router.replace(`/login`);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSuccess]);

  const setUser = (newUser) => {
    queryClient.setQueryData(PROFILE_QUERY_KEY, newUser ?? null);
  };

  const setUserStatus = (newStatus) => {
    if (newStatus === STATE.SUCCESS) {
      queryClient.setQueryData(PROFILE_QUERY_KEY, (old) => old ?? null);
    }
  }

  return { user: user ?? null, userStatus, setUser, setUserStatus };
}
