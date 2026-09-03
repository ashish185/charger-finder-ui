import { apiFetch, ApiError } from "@/lib/api/client";

class UserRepository {
  findByPhone = async (phone, token) => {
    try {
      const { data } = await apiFetch(`/user/${encodeURIComponent(phone)}`, { token });
      return data;
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        return null;
      }
      throw err;
    }
  };

  create = async ({ phone, name, email }) => {
    const { data } = await apiFetch("/user", {
      method: "POST",
      body: JSON.stringify({
        fullName: name,
        phoneNumber: phone,
        ...(email ? { email } : {}),
      }),
    });
    return data;
  };

  getProfile = async () => {
    return apiFetch("/user/me");
  };

  completeProfile = async ({ fullName, email, password, agreedToTerms }) => {
    return apiFetch("/user/me", {
      method: "PATCH",
      body: JSON.stringify({
        full_name: fullName,
        ...(email ? { email } : {}),
        ...(password ? { password } : {}),
        agreed_to_terms: agreedToTerms,
      }),
    });
  };

  setRole = async (role) => {
    return apiFetch("/user/role", {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
  };

  logout = async () => {
    return apiFetch("/auth/logout", {
      method: "POST",
    });
  };
}

const userRepository = new UserRepository();
export default userRepository;
