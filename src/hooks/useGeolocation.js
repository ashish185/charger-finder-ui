"use client";

import { useEffect, useState } from "react";

const TIMEOUT_MS = 8000;

// Resolves to {lat, lng} or null. Never rejects: a denied permission, a
// timeout, or a browser without the API all resolve to null so callers can
// still load a location-less list.
function requestPosition() {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      () => resolve(null),
      { timeout: TIMEOUT_MS, maximumAge: 5 * 60 * 1000 },
    );
  });
}

export function useGeolocation() {
  const [state, setState] = useState({ coords: null, ready: false });

  useEffect(() => {
    let cancelled = false;

    requestPosition().then((coords) => {
      if (cancelled) return;
      setState({ coords, ready: true });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
