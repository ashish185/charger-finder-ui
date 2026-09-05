import { apiFetch } from "@/lib/api/client";

class CpoStationRepository {
  createStation = async (payload) => {
    const { data } = await apiFetch("/operator/stations", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data ?? null;
  };

  listMyStations = async () => {
    const { data } = await apiFetch("/operator/stations");
    return data ?? [];
  };

  getStation = async (stationId) => {
    const { data } = await apiFetch(`/operator/stations/${encodeURIComponent(stationId)}`);
    return data ?? null;
  };

  createCharger = async (stationId, payload) => {
    const { data } = await apiFetch(
      `/operator/stations/${encodeURIComponent(stationId)}/chargers`,
      { method: "POST", body: JSON.stringify(payload) },
    );
    return data ?? null;
  };

  updateStation = async (stationId, payload) => {
    const { data } = await apiFetch(`/operator/stations/${encodeURIComponent(stationId)}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return data ?? null;
  };

  updateCharger = async (stationId, chargerId, payload) => {
    const { data } = await apiFetch(
      `/operator/stations/${encodeURIComponent(stationId)}/chargers/${encodeURIComponent(chargerId)}`,
      { method: "PATCH", body: JSON.stringify(payload) },
    );
    return data ?? null;
  };
}

const cpoStationRepository = new CpoStationRepository();
export default cpoStationRepository;
