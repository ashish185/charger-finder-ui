"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CpoStationService } from "@/services/cpoStationService";
import FormField from "@/components/FormField";

const NewStationPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [amenities, setAmenities] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const station = await CpoStationService.createStation({
        name: name.trim(),
        address: address.trim(),
        location: { lat: Number(lat), lng: Number(lng) },
        operatingHours: `${openTime}-${closeTime}`,
        amenities: amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });
      const stationId = station?.stationId;
      router.push(stationId ? `/cpo/stations/${stationId}` : "/cpo");
    } catch (err) {
      console.error("Failed to create station:", err);
      setError(err?.message || "Couldn't create the station. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold text-on-surface">New station</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          id="name"
          label="Station name"
          type="text"
          placeholder="Downtown Fast Charge"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="organization"
          required
        />

        <FormField
          id="address"
          label="Address"
          type="text"
          placeholder="123 Main St, Springfield"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autoComplete="street-address"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            id="lat"
            label="Latitude"
            type="number"
            step="any"
            placeholder="37.7749"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            autoComplete="off"
            required
          />
          <FormField
            id="lng"
            label="Longitude"
            type="number"
            step="any"
            placeholder="-122.4194"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField
            id="openTime"
            label="Opens at"
            type="time"
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
            required
          />
          <FormField
            id="closeTime"
            label="Closes at"
            type="time"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
            required
          />
        </div>

        <FormField
          id="amenities"
          label="Amenities (comma separated)"
          type="text"
          placeholder="restroom, food, parking, wifi"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
        />

        <button
          type="submit"
          disabled={
            !name.trim() || !address.trim() || !lat || !lng || !openTime || !closeTime || submitting
          }
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-on-primary transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Creating…" : "Create station"}
        </button>
      </form>
    </div>
  );
};

export default NewStationPage;
