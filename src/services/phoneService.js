import { authUrl } from "@/app/constants";
import { handleResponse } from "@/utils/api";

export class PhoneService {
  static async phoneLogin(idToken) {
    const res = await fetch(`${authUrl}/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ idToken }),
    });

    return handleResponse(res, "Login failed");
  }
}
