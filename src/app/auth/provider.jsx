// src/AuthContext.jsx
// Small context so any component can read "am I logged in" and "who am I"
// without prop-drilling. Authentication is managed via cookies on the backend.
"use client"
import { usePathname } from "next/navigation";
import { createContext, useContext } from "react";
import { useAuthProfile } from "../../hooks/useAuthProfile";
import { STATE } from "../constants";
import { getPostAuthRoute } from "@/utils/auth";
import AuthRedirector from "@/components/auth/AuthRedirector"

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const pathName = usePathname();
    const { user, userStatus, setUser, setUserStatus } = useAuthProfile(pathName);

    function loginSuccess(newUser) {
        setUser(newUser);
        setUserStatus(STATE.SUCCESS);
    }

    function logout() {
        setUser(null);
        setUserStatus(STATE.SUCCESS);
    }

    return (
        <AuthContext.Provider value={{ user, loginSuccess, logout, userStatus, setUser }}>
            <AuthRedirector user={user} userStatus={userStatus}>
                {children}
            </AuthRedirector>
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
