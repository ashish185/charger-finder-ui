import { apiFetch } from "@/lib/api/client";

class BookingRepository {
  async createBooking(chargerId, slotId) {
    const { data } = await apiFetch("/bookings", {
      method: "POST",
      body: JSON.stringify({ chargerId, slotId }),
    });
    return data ?? null;
  }

  async listMyBookings({ page, limit } = {}) {
    const params = new URLSearchParams();
    if (page) params.set("page", page);
    if (limit) params.set("limit", limit);
    const query = params.toString();
    const { data } = await apiFetch(`/bookings/my${query ? `?${query}` : ""}`);
    return data ?? { bookings: [], pagination: { page: 1, limit: 20, total: 0 } };
  }
}

const bookingRepository = new BookingRepository();
export default bookingRepository;
