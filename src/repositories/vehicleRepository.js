import { apiFetch } from "@/lib/api/client";

class VehicleRepository {
  async create(vehicle, token) {
    const { data } = await apiFetch("/vehicles", {
      method: "POST",
      token,
      body: JSON.stringify(vehicle),
    });
    return data;
  }

  async findAll(token) {
    const { data } = await apiFetch("/vehicles", { token });
    return data;
  }
}

const vehicleRepository = new VehicleRepository();
export default vehicleRepository;
