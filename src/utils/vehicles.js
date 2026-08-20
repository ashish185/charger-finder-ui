// Ids match the backend's VEHICLE_SIZE enum (see charger-finder/src/constants.js)
// so they can be sent straight through as `vehicleType` with no translation layer.
export const VEHICLE_TYPES = [
  { id: "two_wheeler_scooter", label: "Two-wheeler scooter" },
  { id: "two_wheeler_motorcycle", label: "Two-wheeler motorcycle" },
  { id: "three_wheeler", label: "Three-wheeler" },
  { id: "four_wheeler_hatchback", label: "Four-wheeler hatchback" },
  { id: "four_wheeler_sedan", label: "Four-wheeler sedan" },
  { id: "four_wheeler_suv", label: "Four-wheeler SUV" },
];
