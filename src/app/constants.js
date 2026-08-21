
export const authUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
const jsonHeaders = { "Content-Type": "application/json" };
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

export const URLS= {
    BASE: `${import.meta.env.VITE_API_URL}/api/v1`,
}