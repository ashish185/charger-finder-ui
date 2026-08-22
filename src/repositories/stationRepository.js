import { apiFetch } from "@/lib/api/client";

class StationRepository {
  // lat/lng must be sent together or the backend rejects the request, and
  // distanceKm is only present when both are set.
  async findNearbyStations({ lat, lng, radiusKm } = {}) {
    const params = new URLSearchParams();

    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      params.set("lat", String(lat));
      params.set("lng", String(lng));
      if (Number.isFinite(radiusKm)) {
        params.set("radiusKm", String(radiusKm));
      }
    }

    const query = params.toString();
    const { data } = await apiFetch(`/stations/nearby${query ? `?${query}` : ""}`);
    return data ?? [];
  }
}

const stationRepository = new StationRepository();
export default stationRepository;
