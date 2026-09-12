/* eslint-disable no-undef */
export const API_BASE_PATH = "/api/v1"; // used by browser-side fetches, proxied by next.config.js rewrites
export const SERVER_V1_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`; // used by server-side (SSR) fetches only
export const authUrl = `${SERVER_V1_URL}/auth`; // keep as-is; only used server-side context references stay, see below

export const STATE = {
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
}

export const ROLE = {
    OPERATOR: "operator",
    CUSTOMER: "customer",
    PRICING_MANAGER: "pricing_manager",
}