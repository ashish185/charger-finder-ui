import { SERVER_V1_URL, API_BASE_PATH } from "@/app/constants";

export class ApiError extends Error {
  constructor(message, { status, code } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export async function apiFetch(path, { token, ...options } = {}) {
  console.log("****************apiFetch called", `${API_BASE_PATH}${path}`, options, token);
  const response = await fetch(`${API_BASE_PATH}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(data?.error?.message || data?.message || "Request failed", {
      status: response.status,
      code: data?.error?.code,
    });
  }

  return data;
}
