"use client";

import { useState } from "react";
import ChargerReviews from "./ChargerReviews";
import ChargerAvailabilitySlots from "./ChargerAvailabilitySlots";

const STATUS_LABEL = {
  AVAILABLE: "Available",
  IN_USE: "In use",
  UNAVAILABLE: "Unavailable",
};

const STATUS_STYLE = {
  AVAILABLE: "bg-primary-container/20 text-on-primary-container",
  IN_USE: "bg-tertiary-container/20 text-on-tertiary-container",
  UNAVAILABLE: "bg-error-container text-on-error-container",
};

function formatPrice(value) {
  return Number.isFinite(value) ? `₹${value.toFixed(2)}` : null;
}

export default function ChargerCard({ charger }) {
  const [slotsOpen, setSlotsOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  const {
    chargerId,
    connectorType,
    maxPowerKw,
    pricePerKwh,
    pricePerMinute,
    status,
  } = charger;

  const isBookable = status === "AVAILABLE";
  const perKwh = formatPrice(pricePerKwh);
  const perMinute = formatPrice(pricePerMinute);

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-container text-xl">
            ⚡
          </span>
          <div>
            <h3 className="text-sm font-semibold text-on-surface">
              {connectorType || "Charger"}
            </h3>
            <p className="text-sm text-on-surface-variant">
              {Number.isFinite(maxPowerKw) ? `${maxPowerKw} kW` : "Power N/A"}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
            STATUS_STYLE[status] ?? "bg-surface-container text-on-surface-variant"
          }`}
        >
          {STATUS_LABEL[status] ?? status ?? "Unknown"}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-outline-variant/30 pt-4">
        <div className="flex flex-col">
          <span className="text-xs text-on-surface-variant">Price</span>
          <span className="text-lg font-semibold text-on-surface">
            {perKwh ? `${perKwh}/kWh` : "Not listed"}
          </span>
          {perMinute && (
            <span className="text-xs text-on-surface-variant">
              + {perMinute}/min
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setSlotsOpen((open) => !open)}
          disabled={!isBookable}
          className="h-10 rounded-xl bg-primary px-6 text-sm font-semibold text-on-primary transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {slotsOpen ? "Hide spots" : "See available spots"}
        </button>
      </div>

      {slotsOpen && (
        <ChargerAvailabilitySlots chargerId={chargerId} charger={charger} />
      )}

      <button
        type="button"
        onClick={() => setReviewsOpen((open) => !open)}
        className="mt-3 text-sm font-semibold text-primary"
      >
        {reviewsOpen ? "Hide reviews" : "Show reviews"}
      </button>

      {reviewsOpen && <ChargerReviews chargerId={chargerId} />}
    </div>
  );
}
