"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useChargers } from "@/hooks/useChargers";
import { useSelectedStationStore } from "@/hooks/useSelectedStationStore";
import ChargerCard from "@/components/stations/ChargerCard";
import CardSkeleton from "@/components/stations/CardSkeleton";
import { STATE } from "@/app/constants";

export default function StationChargersPage() {
  const { stationId } = useParams();
  const selected = useSelectedStationStore((state) => state.station);
  const { chargers, status, error, retry } = useChargers(stationId);

  // Only trust the handed-over station if it matches the URL; on a hard refresh
  // the store is empty and the header simply degrades.
  const station = selected?.stationId === stationId ? selected : null;

  return (
    <div className="mx-auto w-full max-w-sm px-4 py-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
      >
        ← Back to stations
      </Link>

      <header className="mt-4">
        <h1 className="text-2xl font-bold text-on-surface">
          {station?.name ?? "Chargers"}
        </h1>
        {station?.address && (
          <p className="mt-1 text-sm text-on-surface-variant">
            {station.address}
          </p>
        )}
        {station && (
          <p className="mt-2 text-sm text-on-surface-variant">
            {station.availableChargers} of {station.totalChargers} chargers free
          </p>
        )}
      </header>

      <div className="mt-6">
        {status === STATE.LOADING && <CardSkeleton count={2} />}

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

        {status === STATE.SUCCESS && chargers.length === 0 && (
          <p className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 text-center text-sm text-on-surface-variant">
            This station has no chargers listed yet.
          </p>
        )}

        {status === STATE.SUCCESS && chargers.length > 0 && (
          <div className="space-y-3">
            {chargers.map((charger) => (
              <ChargerCard key={charger.chargerId} charger={charger} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
