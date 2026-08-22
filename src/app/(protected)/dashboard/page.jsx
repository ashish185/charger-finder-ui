"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchNearbyStations } from "@/services/stationService";
import { useGeolocation } from "@/hooks/useGeolocation";
import StationCard from "@/components/stations/StationCard";
import StationSearch from "@/components/stations/StationSearch";
import CardSkeleton from "@/components/stations/CardSkeleton";
import { STATE } from "@/app/constants";

export default function DashboardPage() {
  const { coords, ready } = useGeolocation();
  const [stations, setStations] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // Wait for the geolocation attempt to settle so we only fetch once, either
    // with coordinates or without them.
    if (!ready) return;

    let cancelled = false;

    fetchNearbyStations(coords ?? {})
      .then((data) => {
        if (cancelled) return;
        setStations(data);
        setStatus(STATE.SUCCESS);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load nearby stations:", err);
        setError(err?.message || "Could not load nearby stations.");
        setStatus(STATE.ERROR);
      });

    return () => {
      cancelled = true;
    };
  }, [ready, coords, reloadKey]);

  const retry = useCallback(() => {
    setStatus(STATE.LOADING);
    setError("");
    setReloadKey((key) => key + 1);
  }, []);

  const visibleStations = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return stations;
    return stations.filter((station) =>
      `${station.name ?? ""} ${station.address ?? ""}`
        .toLowerCase()
        .includes(term),
    );
  }, [stations, query]);

  return (
    <div className="mx-auto w-full max-w-sm px-4 py-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-on-surface">Nearby stations</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          {coords
            ? "Sorted by distance from your location"
            : "Showing all stations — enable location for distances"}
        </p>
      </header>

      <StationSearch value={query} onChange={setQuery} />

      <div className="mt-6">
        {status === STATE.LOADING && <CardSkeleton />}

        {status === STATE.ERROR && (
          <div className="rounded-xl bg-error-container p-4 text-sm text-on-error-container">
            <p>{error}</p>
            <button
              type="button"
              onClick={retry}
              className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition active:scale-95"
            >
              Retry
            </button>
          </div>
        )}

        {status === STATE.SUCCESS && visibleStations.length === 0 && (
          <p className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 text-center text-sm text-on-surface-variant">
            {stations.length === 0
              ? "No charging stations found nearby."
              : `No stations match “${query}”.`}
          </p>
        )}

        {status === STATE.SUCCESS && visibleStations.length > 0 && (
          <div className="space-y-4">
            {visibleStations.map((station) => (
              <StationCard key={station.stationId} station={station} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
