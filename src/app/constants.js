const API_URL = "http://localhost:5000";
const API_VERSION = "v1";
const baseUrl = `${API_URL}/api/${API_VERSION}`;
export const authUrl = `${baseUrl}/auth`;
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