import VehicleRepository from "@/repositories/vehicleRepository";

export async function createVehicle(vehicle, token) {
  return VehicleRepository.create(vehicle, token);
}

export async function listVehicles(token) {
  return VehicleRepository.findAll(token);
}

export class VehicleService {
}