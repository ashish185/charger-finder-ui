import { apiFetch, ApiError } from "./client";

export async function getUserByPhone(phone, token) {
  try {
    const { data } = await apiFetch(`/user/${encodeURIComponent(phone)}`, { token });
    return data;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null;
    }
    throw err;
  }
}

export async function registerUser({ phone, name, email }) {
  const { data } = await apiFetch("/user", {
    method: "POST",
    body: JSON.stringify({
      fullName: name,
      phoneNumber: phone,
      ...(email ? { email } : {}),
    }),
  });
  return data;
}
