"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ChargerService } from "@/services/chargerService";
import { BookingService } from "@/services/bookingService";

function formatSlotRange(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dateLabel = startDate.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
  const timeOptions = { hour: "numeric", minute: "2-digit" };
  const startLabel = startDate.toLocaleTimeString(undefined, timeOptions);
  const endLabel = endDate.toLocaleTimeString(undefined, timeOptions);
  return `${dateLabel}, ${startLabel} – ${endLabel}`;
}

export default function ChargerAvailabilitySlots({ chargerId }) {
  const [slots, setSlots] = useState(null);
  const [error, setError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [estimate, setEstimate] = useState(null);
  const [estimateError, setEstimateError] = useState("");
  const [bookingState, setBookingState] = useState("idle");
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    let cancelled = false;

    ChargerService.fetchChargerAvailabilitySlots(chargerId)
      .then((data) => {
        if (cancelled) return;
        setSlots(data);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load availability slots:", err);
        setError(err?.message || "Could not load availability slots.");
      });

    return () => {
      cancelled = true;
    };
  }, [chargerId]);

  useEffect(() => {
    if (!selectedSlot) return;

    let cancelled = false;

    ChargerService.fetchChargerEstimate(chargerId, selectedSlot._id)
      .then((data) => {
        if (cancelled) return;
        console.log("data", data);
        setEstimate(data);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load charger estimate:", err);
        setEstimateError(err?.message || "Could not load estimate.");
      });

    return () => {
      cancelled = true;
    };
  }, [chargerId, selectedSlot]);

  if (error) {
    return <p className="mt-3 text-sm text-on-error-container">{error}</p>;
  }

  if (slots === null) {
    return (
      <p className="mt-3 text-sm text-on-surface-variant">
        Loading available spots…
      </p>
    );
  }

  const availableSlots = slots.filter(
    (slot) => (slot.status || "").toUpperCase() === "AVAILABLE",
  );

  if (availableSlots.length === 0) {
    return (
      <p className="mt-3 text-sm text-on-surface-variant">
        No available spots for this charger right now.
      </p>
    );
  }

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setEstimate(null);
    setEstimateError("");
    setBookingState("idle");
    setBookingError("");
  };

  const handleBookAndPay = async () => {
    if (!selectedSlot || !window.Razorpay) return;

    setBookingState("processing");
    setBookingError("");

    try {
      const order = await BookingService.createBooking(
        chargerId,
        selectedSlot._id,
      );

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "ChargeFinder",
        description: "Charging slot booking",
        order_id: order.razorpayOrderId,
        handler: () => {
          setBookingState("success");
        },
        modal: {
          ondismiss: () => {
            setBookingState((current) =>
              current === "success" ? current : "idle",
            );
          },
        },
        theme: { color: "#0f766e" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setBookingState("error");
        setBookingError("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      console.error("Failed to create booking:", err);
      setBookingState("error");
      setBookingError(err?.message || "Could not start booking.");
    }
  };

  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
        Available spots
      </p>
      <div className="flex flex-col gap-2">
        {availableSlots.map((slot) => {
          const key = slot._id || `${slot.start}-${slot.end}`;
          const isSelected = selectedSlot && selectedSlot === slot;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleSelectSlot(slot)}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                isSelected
                  ? "border-primary bg-primary-container/20 text-on-primary-container"
                  : "border-outline-variant bg-surface-container-lowest text-on-surface"
              }`}
            >
              {formatSlotRange(slot.start, slot.end)}
            </button>
          );
        })}
      </div>

      {selectedSlot && (
        <div className="rounded-lg bg-surface-container-low px-3 py-2 text-sm text-on-surface">
          <p className="text-xs text-on-surface-variant">Estimated cost</p>
          {estimateError ? (
            <p className="text-sm text-on-error-container">{estimateError}</p>
          ) : (
            <p className="text-lg font-semibold">
              {estimate ? `₹${estimate.estimatedCost.toFixed(2)}` : "Calculating…"}
            </p>
          )}

          {estimate && !estimateError && (
            <>
              {bookingState === "success" ? (
                <p className="mt-3 text-sm font-semibold text-primary">
                  Payment received — your slot will be confirmed shortly.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleBookAndPay}
                  disabled={bookingState === "processing"}
                  className="mt-3 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {bookingState === "processing" ? "Starting payment…" : "Book & Pay"}
                </button>
              )}
              {bookingState === "error" && bookingError && (
                <p className="mt-2 text-sm text-on-error-container">
                  {bookingError}
                </p>
              )}
            </>
          )}
        </div>
      )}

      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
    </div>
  );
}
