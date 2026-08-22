import ChargerRepository from "@/repositories/chargerRepository";

export class ChargerService {
  static async fetchStationChargers(stationId) {
    return ChargerRepository.findChargersByStationId(stationId);
  }

  static async fetchChargerAvailabilitySlots(chargerId) {
    return ChargerRepository.findAvailabilitySlotsByChargerId(chargerId);
  }

  static async fetchChargerEstimate(chargerId, slotId) {
    return ChargerRepository.findEstimateByChargerId(chargerId, slotId);
  }

  static async fetchChargerReviews(chargerId, { page, limit } = {}) {
    return ChargerRepository.findReviewsByChargerId(chargerId, { page, limit });
  }
}
