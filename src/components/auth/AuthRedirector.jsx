"use client";

import { useEffect } from "react";
import { useRouter, usePathname, redirect } from "next/navigation";
import { useAuth } from "@/app/auth/provider";
import { STATE } from "@/app/constants";
import { getPostAuthRoute } from "@/utils/auth";

const AuthRedirector = ({ children, user, userStatus }) => {
  const pathName = usePathname();
  const path = getPostAuthRoute(user, pathName);
     console.log("path path is", path);
  useEffect(() => {
    if (userStatus === STATE.LOADING) return;
    console.log("inside hook")
    redirect(path);
  }, []);

  return user ? children : null;
};

export default AuthRedirector;
