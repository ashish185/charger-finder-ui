"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppUserStore } from "@/hooks/useAppUserStore";

const PUBLIC_PATHS = ["/sign-in"];

export default function AuthGate({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoaded, user } = useUser();
  const { getToken } = useAuth();
  const appUser = useAppUserStore((state) => state.user);
  const isLoading = useAppUserStore((state) => state.isLoading);
  const loadByPhone = useAppUserStore((state) => state.loadByPhone);
  const clearUser = useAppUserStore((state) => state.clearUser);

  const phone = user?.primaryPhoneNumber?.phoneNumber;

  // Not signed in with Clerk -> send to sign-in, unless already there.
  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      clearUser();
      if (!PUBLIC_PATHS.includes(pathname)) {
        router.replace("/sign-in");
      }
      return;
    }

    if (phone) {
      getToken().then((token) => loadByPhone(phone, token).catch(() => {}));
    }
  }, [isLoaded, user, phone, getToken, loadByPhone, clearUser, pathname, router]);

  // Signed in with Clerk -> route based on whether the user exists in our db.
  useEffect(() => {
    if (!isLoaded || !user || isLoading) return;

    if (!appUser) {
      if (pathname !== "/register") {
        router.replace("/register");
      }
      return;
    }

    const isCustomer = appUser.role?.includes("customer");
    if (isCustomer && pathname !== "/chargers") {
      router.replace("/chargers");
    }
  }, [isLoaded, user, isLoading, appUser, pathname, router]);

  return children;
}
