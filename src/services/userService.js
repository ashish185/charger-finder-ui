import UserRepository from "@/repositories/userRepository";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
const authUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

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
    const res = await fetch(`${baseUrl}/user/me`, {
      credentials: "include",
    });

    return handleResponse(res, "Could not fetch profile");
  }

  static async completeProfile({ fullName, email, password, agreedToTerms }) {
    const res = await fetch(`${baseUrl}/user/me`, {
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
    const res = await fetch(`${baseUrl}/user/role`, {
      method: "PATCH",
      headers: jsonHeaders,
      credentials: "include",
      body: JSON.stringify({ role }),
    });

    return handleResponse(res, "Could not update role");
  }

  static async logout() {
    const res = await fetch(`${authUrl}/logout`, {
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
