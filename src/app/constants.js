
export const authUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
const jsonHeaders = { "Content-Type": "application/json" };

export const SERVER_V1_URL= `${process.env.API_PROXY_TARGET}/api/v1`;
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