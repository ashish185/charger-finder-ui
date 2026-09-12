import { handleResponse } from "@/utils/api";
import { apiFetch } from "../lib/api/client";

export class PhoneService {
  static async phoneLogin(idToken) {
    const res = await apiFetch(`/auth/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ idToken }),
    });

    return handleResponse(res, "Login failed");
  }
}
