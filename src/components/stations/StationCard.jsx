"use client";

import Link from "next/link";
import { useSelectedStationStore } from "@/hooks/useSelectedStationStore";

function formatDistance(distanceKm) {
  if (!Number.isFinite(distanceKm)) return null;
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)} m away`;
  return `${distanceKm.toFixed(1)} km away`;
}

export default function StationCard({ station }) {
  const selectStation = useSelectedStationStore((state) => state.selectStation);

  const {
    stationId,
    name,
    address,
    distanceKm,
    totalChargers = 0,
    availableChargers = 0,
    amenities = [],
    operatingHours,
  } = station;

  const distance = formatDistance(distanceKm);
  const isAvailable = availableChargers > 0;

  return (
    <Link
      href={`/stations/${stationId}`}
      onClick={() => selectStation(station)}
      className="block rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm transition hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-on-surface">
            {name}
          </h3>
          <p className="mt-0.5 text-sm text-on-surface-variant">
            {[distance, address].filter(Boolean).join(" • ")}
          </p>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
            isAvailable
              ? "bg-primary-container/20 text-on-primary-container"
              : "bg-surface-container text-on-surface-variant"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isAvailable ? "bg-primary-container" : "bg-outline"
            }`}
          />
          {isAvailable ? "Available" : "Busy"}
        </span>
      </div>

      {amenities.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="rounded-lg border border-outline-variant/30 bg-surface-container px-3 py-1 text-xs font-semibold text-secondary"
            >
              {amenity}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-end justify-between border-t border-outline-variant/30 pt-4">
        <div className="flex flex-col">
          <span className="text-xs text-on-surface-variant">Chargers</span>
          <span className="text-lg font-semibold text-on-surface">
            {availableChargers}
            <span className="text-sm font-normal text-on-surface-variant">
              {" "}
              / {totalChargers} free
            </span>
          </span>
        </div>
        {operatingHours?.is24x7 ? (
          <span className="text-xs font-semibold text-on-surface-variant">
            Open 24×7
          </span>
        ) : (
          operatingHours?.open &&
          operatingHours?.close && (
            <span className="text-xs font-semibold text-on-surface-variant">
              {operatingHours.open} – {operatingHours.close}
            </span>
          )
        )}
      </div>
    </Link>
  );
}
