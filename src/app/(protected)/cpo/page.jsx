"use client";

import Link from "next/link";
import { useCpoStations } from "@/hooks/useCpoStations";
import { STATE } from "@/app/constants";

const CpoStationsPage = () => {
  const { stations, status, error, retry } = useCpoStations();

  if (status === STATE.LOADING) {
    return <p className="text-sm text-on-surface-variant">Loading your stations…</p>;
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

  if (stations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-outline-variant p-6 text-center text-sm text-on-surface-variant">
        You haven&apos;t added any stations yet.{" "}
        <Link href="/cpo/stations/new" className="font-semibold text-primary">
          Add your first station
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {stations.map((station) => (
        <li
          key={station.stationId}
          className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm"
        >
          <Link href={`/cpo/stations/${station.stationId}`} className="block min-w-0">
            <h3 className="truncate text-base font-semibold text-on-surface">
              {station.name}
            </h3>
            <p className="mt-0.5 truncate text-sm text-on-surface-variant">
              {station.address}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CpoStationsPage;
