"use client";

import { useCallback, useEffect, useState } from "react";
import { ChargerService } from "@/services/chargerService";
import { STATE } from "@/app/constants";

export function useChargers(stationId) {
  const [chargers, setChargers] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!stationId) return;

    let cancelled = false;

    ChargerService.fetchStationChargers(stationId)
      .then((data) => {
        if (cancelled) return;
        setChargers(data);
        setStatus(STATE.SUCCESS);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load chargers:", err);
        setError(err?.message || "Could not load chargers for this station.");
        setStatus(STATE.ERROR);
      });

    return () => {
      cancelled = true;
    };
  }, [stationId, reloadKey]);

  const retry = useCallback(() => {
    setStatus(STATE.LOADING);
    setError("");
    setReloadKey((key) => key + 1);
  }, []);

  return { chargers, status, error, retry };
}
