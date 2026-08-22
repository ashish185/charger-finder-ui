import { apiFetch } from "@/lib/api/client";

class ChargerRepository {
  async findChargersByStationId(stationId) {
    const { data } = await apiFetch(
      `/stations/${encodeURIComponent(stationId)}/chargers`,
    );
    return data ?? [];
  }

  async findAvailabilitySlotsByChargerId(chargerId) {
    const { data } = await apiFetch(
      `/chargers/${encodeURIComponent(chargerId)}/availability-slots`,
    );
    return data ?? [];
  }

  async findEstimateByChargerId(chargerId, slotId) {
    const { data } = await apiFetch(
      `/chargers/${encodeURIComponent(chargerId)}/estimate?slotId=${encodeURIComponent(slotId)}`,
    );
    return data ?? null;
  }

  async findReviewsByChargerId(chargerId, { page, limit } = {}) {
    const params = new URLSearchParams();
    if (Number.isFinite(page)) params.set("page", String(page));
    if (Number.isFinite(limit)) params.set("limit", String(limit));

    const query = params.toString();
    const { data } = await apiFetch(
      `/chargers/${encodeURIComponent(chargerId)}/reviews${query ? `?${query}` : ""}`,
    );
    return data ?? { reviews: [], pagination: { page: 1, limit: 0, total: 0 } };
  }
}

const chargerRepository = new ChargerRepository();
export default chargerRepository;
