import { apiFetch, ApiError } from "@/lib/api/client";

class UserRepository {
  async findByPhone(phone, token) {
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

  async create({ phone, name, email }) {
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
}

const userRepository = new UserRepository();
export default userRepository;
