"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase"
import { UserService } from "@/services/userService";
import { useAuth } from "@/app/auth/provider";

const LogoutButton = ({ className = "" }) => {
  const router = useRouter();
  const { logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await UserService.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }

    try {
      await signOut(auth);
    } catch (err) {
      console.error("Firebase sign-out failed:", err);
    }

    logout();
    setLoggingOut(false);
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loggingOut}
      className={`text-sm font-medium text-on-surface-variant hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {loggingOut ? "Logging out…" : "Log out"}
    </button>
  );
}

export default LogoutButton;
