// src/AuthContext.jsx
// Small context so any component can read "am I logged in" and "who am I"
// without prop-drilling. Authentication is managed via cookies on the backend.
"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { STATE } from  "../constants";
import { UserService } from "@/services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userStatus, setUserStatus] = useState(STATE.LOADING);

    useEffect(() => {
        UserService.getProfile()
            .then((response) => {
                const userFromResponse = response?.user ?? response?.data ?? null;
                setUser(userFromResponse);
                setUserStatus(STATE.SUCCESS);
            })
            .catch(() => {
                setUser(null);
                setUserStatus(STATE.ERROR);
            })
    }, []);

    function loginSuccess(newUser) {
        setUser(newUser);
        setUserStatus(STATE.SUCCESS);
    }

    function logout() {
        setUser(null);
        setUserStatus(STATE.LOADING);
    }

    return (
        <AuthContext.Provider value={{ user, loginSuccess, logout, userStatus, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
