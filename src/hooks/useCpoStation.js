"use client";

import { useCallback, useEffect, useState } from "react";
import { CpoStationService } from "@/services/cpoStationService";
import { STATE } from "@/app/constants";

export const useCpoStation = (stationId) => {
  const [station, setStation] = useState(null);
  const [chargers, setChargers] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!stationId) return;

    let cancelled = false;

    CpoStationService.getStation(stationId)
      .then((data) => {
        if (cancelled) return;
        setStation(data ?? null);
        setChargers(data?.chargers ?? []);
        setStatus(STATE.SUCCESS);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load station:", err);
        setError(err?.message || "Could not load this station.");
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

  return { station, chargers, status, error, retry, setChargers };
};
