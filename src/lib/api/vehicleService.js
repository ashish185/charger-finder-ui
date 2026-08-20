import { apiFetch } from "./client";

export async function createVehicle(vehicle, token) {
  const { data } = await apiFetch("/vehicles", {
    method: "POST",
    token,
    body: JSON.stringify(vehicle),
  });
  return data;
}

export async function listVehicles(token) {
  const { data } = await apiFetch("/vehicles", { token });
  return data;
}
