"use client"
import { useAuthProfile } from "@/hooks/useAuthProfile"

const PublicRoute = ({ children }) => {
    useAuthProfile();
    return (children)
}

export default PublicRoute;