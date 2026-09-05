"use client";

import { useCallback, useEffect, useState } from "react";
import { CpoStationService } from "@/services/cpoStationService";
import { STATE } from "@/app/constants";

export const useCpoStations = () => {
  const [stations, setStations] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    CpoStationService.listMyStations()
      .then((data) => {
        if (cancelled) return;
        setStations(data?.stations ?? []);
        setStatus(STATE.SUCCESS);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load stations:", err);
        setError(err?.message || "Could not load your stations.");
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

  return { stations, status, error, retry };
};
