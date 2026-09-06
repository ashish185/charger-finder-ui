import UserRepository from "../repositories/userRepository";
import { apiFetch } from "../api/client";

const jsonHeaders = {
  "Content-Type": "application/json",
};

export async function getUserByPhone(phone, token) {
  return UserRepository.findByPhone(phone, token);
}

export async function registerUser({ phone, name, email }) {
  return UserRepository.create({ phone, name, email });
}

export class UserService {
  static async getProfile() {
    const res = await apiFetch(`/user/me`, {
      credentials: "include",
    });

    return handleResponse(res, "Could not fetch profile");
  }

  static async completeProfile({ fullName, email, password, agreedToTerms }) {
    const res = await apiFetch(`/user/me`, {
      method: "PATCH",
      headers: jsonHeaders,
      credentials: "include",
      body: JSON.stringify({
        full_name: fullName,
        ...(email ? { email } : {}),
        ...(password ? { password } : {}),
        agreed_to_terms: agreedToTerms,
      }),
    });

    return handleResponse(res, "Could not save your details");
  }

  static async setRole(role) {
    const res = await apiFetch(`/user/role`, {
      method: "PATCH",
      headers: jsonHeaders,
      credentials: "include",
      body: JSON.stringify({ role }),
    });

    return handleResponse(res, "Could not update role");
  }

  static async logout() {
    const res = await apiFetch(`/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    return handleResponse(res, "Logout failed");
  }
}

async function handleResponse(res, errorMessage) {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || errorMessage);
  }

  return data;
}
