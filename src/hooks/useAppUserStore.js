import { create } from "zustand";
import { UserService } from "@/services/userService";
import { createVehicle } from "@/services/vehicleService";

export const useAppUserStore = create((set) => ({
  user: null,
  isLoading: true,
  error: null,

  loadByPhone: async (phone, token) => {
    set({ isLoading: true, error: null });
    try {
      const user = await UserService.getUserByPhone(phone, token);
      set({ user, isLoading: false });
      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load user";
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  completeRegistration: async ({ phone, name, email, manufacturer, model, vehicleType, token }) => {
    set({ isLoading: true, error: null });
    try {
      const user = await UserService.registerUser({ phone, name, email });
      await createVehicle({ manufacturer, model, vehicleType }, token);
      set({ user, isLoading: false });
      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to complete registration";
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  clearUser: () => set({ user: null, isLoading: false, error: null }),
  clearError: () => set({ error: null }),
}));
