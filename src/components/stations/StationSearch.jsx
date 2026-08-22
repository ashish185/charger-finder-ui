"use client";

export default function StationSearch({ value, onChange }) {
  return (
    <div className="relative flex items-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-4 h-5 w-5 fill-current text-on-surface-variant"
      >
        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14" />
      </svg>
      <label htmlFor="station-search" className="sr-only">
        Search stations
      </label>
      <input
        id="station-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search area or station"
        className="h-12 w-full rounded-xl border border-outline-variant bg-surface-container-low pl-12 pr-4 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
