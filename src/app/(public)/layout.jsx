"use client"
import { useAuthProfile } from "@/hooks/useAuthProfile"

export default function PublicRoute({ children }) {
    useAuthProfile();
    return (children)
}