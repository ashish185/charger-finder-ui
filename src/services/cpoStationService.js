import CpoStationRepository from "@/repositories/cpoStationRepository";

export class CpoStationService {
  static createStation = async (payload) => CpoStationRepository.createStation(payload);

  static listMyStations = async () => CpoStationRepository.listMyStations();

  static getStation = async (stationId) => CpoStationRepository.getStation(stationId);

  static createCharger = async (stationId, payload) =>
    CpoStationRepository.createCharger(stationId, payload);

  static updateStation = async (stationId, payload) =>
    CpoStationRepository.updateStation(stationId, payload);

  static updateCharger = async (stationId, chargerId, payload) =>
    CpoStationRepository.updateCharger(stationId, chargerId, payload);
}
