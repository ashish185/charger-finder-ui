import StationRepository from "@/repositories/stationRepository";

export async function fetchNearbyStations({ lat, lng, radiusKm } = {}) {
  return StationRepository.findNearbyStations({ lat, lng, radiusKm });
}
