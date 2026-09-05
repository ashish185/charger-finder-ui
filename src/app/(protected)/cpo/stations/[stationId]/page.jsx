"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useCpoStation } from "@/hooks/useCpoStation";
import { CpoStationService } from "@/services/cpoStationService";
import FormField from "@/components/FormField";
import { STATE } from "@/app/constants";
import { VEHICLE_TYPES } from "@/utils/vehicles";

const CONNECTOR_TYPES = ["Type 2", "CCS2"];
const CHARGING_TYPES = ["AC", "DC"];
const SLOT_STATUSES = ["AVAILABLE", "BOOKED"];
const STATION_STATUSES = ["open", "closed", "fully_booked"];
const emptySlot = () => ({ startTime: "", endTime: "", status: "AVAILABLE" });

const pad = (n) => String(n).padStart(2, "0");

const toLocalDateValue = (iso) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const toLocalTimeValue = (iso) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const combineDateTime = (dateValue, timeValue) => new Date(`${dateValue}T${timeValue}`);

const StationEditForm = ({ station, onSubmit, onCancel, submitting }) => {
  const [openTime, closeTime] = (station?.operatingHours || "").split("-");
  const [name, setName] = useState(station?.name || "");
  const [address, setAddress] = useState(station?.address || "");
  const [lat, setLat] = useState(station?.location?.lat ?? "");
  const [lng, setLng] = useState(station?.location?.lng ?? "");
  const [opens, setOpens] = useState(openTime || "");
  const [closes, setCloses] = useState(closeTime || "");
  const [amenities, setAmenities] = useState((station?.amenities || []).join(", "));
  const [occupancy, setOccupancy] = useState(station?.occupancy || []);
  const [stationStatus, setStationStatus] = useState(station?.status || "open");

  const toggleOccupancy = (id) => {
    setOccupancy((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: name.trim(),
      address: address.trim(),
      location: { lat: Number(lat), lng: Number(lng) },
      operatingHours: opens && closes ? `${opens}-${closes}` : undefined,
      amenities: amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      occupancy,
      status: stationStatus,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-4 rounded-lg border border-outline-variant/40 p-4"
    >
      <FormField
        id="editName"
        label="Station name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <FormField
        id="editAddress"
        label="Address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          id="editLat"
          label="Latitude"
          type="number"
          step="any"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
        <FormField
          id="editLng"
          label="Longitude"
          type="number"
          step="any"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField
          id="editOpens"
          label="Opens at"
          type="time"
          value={opens}
          onChange={(e) => setOpens(e.target.value)}
        />
        <FormField
          id="editCloses"
          label="Closes at"
          type="time"
          value={closes}
          onChange={(e) => setCloses(e.target.value)}
        />
      </div>
      <FormField
        id="editAmenities"
        label="Amenities (comma separated)"
        type="text"
        value={amenities}
        onChange={(e) => setAmenities(e.target.value)}
      />
      <div>
        <span className="mb-1.5 block text-sm font-medium text-on-surface">Vehicle occupancy</span>
        <div className="flex flex-wrap gap-2">
          {VEHICLE_TYPES.map((vehicle) => (
            <button
              key={vehicle.id}
              type="button"
              onClick={() => toggleOccupancy(vehicle.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                occupancy.includes(vehicle.id)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-outline-variant text-on-surface-variant"
              }`}
            >
              {vehicle.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="editStatus" className="mb-1.5 block text-sm font-medium text-on-surface">
          Status
        </label>
        <select
          id="editStatus"
          value={stationStatus}
          onChange={(e) => setStationStatus(e.target.value)}
          className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          {STATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-on-surface-variant"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const ChargerForm = ({ initialValues, onSubmit, onCancel, submitting }) => {
  const [connectorType, setConnectorType] = useState(
    initialValues?.connectorType || CONNECTOR_TYPES[0],
  );
  const [chargingType, setChargingType] = useState(
    initialValues?.chargingType || CHARGING_TYPES[0],
  );
  const [maxPowerKw, setMaxPowerKw] = useState(initialValues?.maxPowerKw ?? "");
  const [pricePerKwh, setPricePerKwh] = useState(initialValues?.pricePerKwh ?? "");
  const [status, setStatus] = useState(initialValues?.status || "AVAILABLE");
  const [slotDate, setSlotDate] = useState(
    toLocalDateValue(initialValues?.availabilitySlots?.[0]?.start),
  );
  const [availabilitySlots, setAvailabilitySlots] = useState(
    initialValues?.availabilitySlots?.length
      ? initialValues.availabilitySlots.map((slot) => ({
          startTime: toLocalTimeValue(slot.start),
          endTime: toLocalTimeValue(slot.end),
          status: slot.status || "AVAILABLE",
        }))
      : [emptySlot()],
  );

  const updateSlot = (index, field, value) => {
    setAvailabilitySlots((current) =>
      current.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot)),
    );
  };

  const addSlot = () => setAvailabilitySlots((current) => [...current, emptySlot()]);

  const removeSlot = (index) =>
    setAvailabilitySlots((current) => current.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      connectorType: connectorType.trim(),
      chargingType,
      maxPowerKw: maxPowerKw === "" ? undefined : Number(maxPowerKw),
      pricePerKwh: pricePerKwh === "" ? undefined : Number(pricePerKwh),
      status,
      availabilitySlots:
        slotDate && availabilitySlots.some((slot) => slot.startTime && slot.endTime)
          ? availabilitySlots
              .filter((slot) => slot.startTime && slot.endTime)
              .map((slot) => ({
                start: combineDateTime(slotDate, slot.startTime).toISOString(),
                end: combineDateTime(slotDate, slot.endTime).toISOString(),
                status: slot.status,
              }))
          : [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3 rounded-lg border border-outline-variant/40 p-3">
      <div>
        <label htmlFor="connectorType" className="mb-1.5 block text-sm font-medium text-on-surface">
          Connector type
        </label>
        <select
          id="connectorType"
          value={connectorType}
          onChange={(e) => setConnectorType(e.target.value)}
          required
          className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          {CONNECTOR_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="chargingType" className="mb-1.5 block text-sm font-medium text-on-surface">
          Charging type
        </label>
        <select
          id="chargingType"
          value={chargingType}
          onChange={(e) => setChargingType(e.target.value)}
          required
          className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          {CHARGING_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField
          id="maxPowerKw"
          label="Max power (kW)"
          type="number"
          step="any"
          value={maxPowerKw}
          onChange={(e) => setMaxPowerKw(e.target.value)}
        />
        <FormField
          id="pricePerKwh"
          label="Price / kWh"
          type="number"
          step="any"
          value={pricePerKwh}
          onChange={(e) => setPricePerKwh(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-on-surface">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="AVAILABLE">Available</option>
          <option value="IN_USE">In use</option>
          <option value="UNAVAILABLE">Unavailable</option>
        </select>
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="block text-sm font-medium text-on-surface">Availability slots</span>
          <button
            type="button"
            onClick={addSlot}
            className="text-sm font-semibold text-primary"
          >
            + Add slot
          </button>
        </div>
        <FormField
          id="slotDate"
          label="Date"
          type="date"
          value={slotDate}
          onChange={(e) => setSlotDate(e.target.value)}
          required
        />
        <div className="mt-2 space-y-2">
          {availabilitySlots.map((slot, index) => (
            <div key={index} className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-end">
              <FormField
                id={`slot-start-${index}`}
                label="Start time"
                type="time"
                value={slot.startTime}
                onChange={(e) => updateSlot(index, "startTime", e.target.value)}
              />
              <FormField
                id={`slot-end-${index}`}
                label="End time"
                type="time"
                value={slot.endTime}
                min={slot.startTime || undefined}
                onChange={(e) => updateSlot(index, "endTime", e.target.value)}
              />
              <select
                aria-label="Slot status"
                value={slot.status}
                onChange={(e) => updateSlot(index, "status", e.target.value)}
                className="rounded-lg border border-outline-variant bg-surface-container-lowest px-2 py-2.5 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {SLOT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeSlot(index)}
                disabled={availabilitySlots.length === 1}
                className="rounded-lg px-2 py-2.5 text-sm font-semibold text-error disabled:opacity-40"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-on-surface-variant"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const ChargerRow = ({ charger, onEdit, editing, submitting, onCancelEdit, onSubmitEdit }) => (
  <li className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
    <div className="flex items-start justify-between gap-2">
      <div>
        <h3 className="text-sm font-semibold text-on-surface">
          {charger.connectorType || "Charger"}
        </h3>
        <p className="text-sm text-on-surface-variant">
          {charger.chargingType ? `${charger.chargingType} • ` : ""}
          {Number.isFinite(charger.maxPowerKw) ? `${charger.maxPowerKw} kW` : "Power N/A"}
          {" • "}
          {charger.status}
          {Number.isFinite(charger.pricePerKwh) ? ` • ₹${charger.pricePerKwh}/kWh` : ""}
        </p>
      </div>
      {!editing && (
        <button onClick={onEdit} className="shrink-0 text-sm font-semibold text-primary">
          Edit
        </button>
      )}
    </div>
    {editing && (
      <ChargerForm
        initialValues={charger}
        submitting={submitting}
        onCancel={onCancelEdit}
        onSubmit={onSubmitEdit}
      />
    )}
  </li>
);

const StationDetailPage = () => {
  const { stationId } = useParams();
  const { station, chargers, status, error, retry, setChargers } = useCpoStation(stationId);
  const [stationData, setStationData] = useState(null);

  const [addingCharger, setAddingCharger] = useState(false);
  const [creatingCharger, setCreatingCharger] = useState(false);
  const [editingChargerId, setEditingChargerId] = useState(null);
  const [savingChargerId, setSavingChargerId] = useState(null);

  const [editingStation, setEditingStation] = useState(false);
  const [savingStation, setSavingStation] = useState(false);

  const currentStation = stationData ?? station;

  const handleCreateCharger = async (payload) => {
    setCreatingCharger(true);
    try {
      const created = await CpoStationService.createCharger(stationId, payload);
      setChargers((current) => [...current, created ?? payload]);
      setAddingCharger(false);
    } catch (err) {
      console.error("Failed to add charger:", err);
      alert(err?.message || "Could not add this charger.");
    } finally {
      setCreatingCharger(false);
    }
  };

  const handleUpdateCharger = async (chargerId, payload) => {
    setSavingChargerId(chargerId);
    try {
      const updated = await CpoStationService.updateCharger(stationId, chargerId, payload);
      setChargers((current) =>
        current.map((charger) =>
          charger.chargerId === chargerId ? { ...charger, ...(updated ?? payload) } : charger,
        ),
      );
      setEditingChargerId(null);
    } catch (err) {
      console.error("Failed to update charger:", err);
      alert(err?.message || "Could not update this charger.");
    } finally {
      setSavingChargerId(null);
    }
  };

  const handleUpdateStation = async (payload) => {
    setSavingStation(true);
    try {
      const updated = await CpoStationService.updateStation(stationId, payload);
      setStationData((current) => ({ ...(current ?? currentStation), ...(updated ?? payload) }));
      setEditingStation(false);
    } catch (err) {
      console.error("Failed to update station:", err);
      alert(err?.message || "Could not update this station.");
    } finally {
      setSavingStation(false);
    }
  };

  if (status === STATE.LOADING) {
    return <p className="text-sm text-on-surface-variant">Loading station…</p>;
  }

  if (status === STATE.ERROR) {
    return (
      <div className="rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container">
        {error}
        <button onClick={retry} className="ml-2 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-lg font-semibold text-on-surface">{currentStation?.name}</h1>
          <p className="mt-1 text-sm text-on-surface-variant">{currentStation?.address}</p>
          {currentStation?.status && (
            <span className="mt-2 inline-block rounded-full bg-surface-container-lowest px-2.5 py-0.5 text-xs font-medium capitalize text-on-surface-variant">
              {currentStation.status.replace("_", " ")}
            </span>
          )}
        </div>
        <button
          onClick={() => setEditingStation((v) => !v)}
          className="shrink-0 text-sm font-semibold text-primary"
        >
          {editingStation ? "Cancel" : "Edit station"}
        </button>
      </div>

      {editingStation && (
        <StationEditForm
          station={currentStation}
          submitting={savingStation}
          onCancel={() => setEditingStation(false)}
          onSubmit={handleUpdateStation}
        />
      )}

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-on-surface">Chargers</h2>
          <button
            onClick={() => setAddingCharger((v) => !v)}
            className="text-sm font-semibold text-primary"
          >
            {addingCharger ? "Cancel" : "+ Add charger"}
          </button>
        </div>

        {addingCharger && (
          <ChargerForm
            submitting={creatingCharger}
            onCancel={() => setAddingCharger(false)}
            onSubmit={handleCreateCharger}
          />
        )}

        {chargers.length === 0 ? (
          <p className="mt-3 text-sm text-on-surface-variant">No chargers added yet.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {chargers.map((charger) => (
              <ChargerRow
                key={charger.chargerId}
                charger={charger}
                editing={editingChargerId === charger.chargerId}
                submitting={savingChargerId === charger.chargerId}
                onEdit={() => setEditingChargerId(charger.chargerId)}
                onCancelEdit={() => setEditingChargerId(null)}
                onSubmitEdit={(payload) => handleUpdateCharger(charger.chargerId, payload)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StationDetailPage;
