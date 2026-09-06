
export const authUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const SERVER_V1_URL= `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

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