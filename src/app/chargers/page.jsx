"use client";

import { useAppUserStore } from "@/hooks/useAppUserStore";

const PLACEHOLDER_CHARGERS = [
  "Green Park Fast Charger - Available",
  "Cyber Hub Charging Hub - Busy",
  "Sector 29 Community Charger - Available",
];

export default function ChargersPage() {
  const appUser = useAppUserStore((state) => state.user);

  if (!appUser) return null;

  return (
    <div className="flex flex-1 flex-col bg-surface px-5 py-10">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="text-[24px] font-bold leading-[30px] text-on-surface">
          Nearby chargers
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Welcome back, {appUser.name}
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {PLACEHOLDER_CHARGERS.map((charger) => (
            <li
              key={charger}
              className="rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface"
            >
              {charger}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
