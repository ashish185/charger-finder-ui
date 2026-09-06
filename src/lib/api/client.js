import { SERVER_V1_URL } from "@/app/constants";

export class ApiError extends Error {
  constructor(message, { status, code } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export async function apiFetch(path, { token, ...options } = {}) {
  const response = await fetch(`${SERVER_V1_URL}${path}`, {
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
