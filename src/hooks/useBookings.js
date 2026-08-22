"use client";

import { useCallback, useEffect, useState } from "react";
import { BookingService } from "@/services/bookingService";
import { STATE } from "@/app/constants";

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    BookingService.listMyBookings()
      .then((data) => {
        if (cancelled) return;
        setBookings(data?.bookings ?? []);
        setStatus(STATE.SUCCESS);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load bookings:", err);
        setError(err?.message || "Could not load your bookings.");
        setStatus(STATE.ERROR);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const retry = useCallback(() => {
    setStatus(STATE.LOADING);
    setError("");
    setReloadKey((key) => key + 1);
  }, []);

  return { bookings, status, error, retry };
}
