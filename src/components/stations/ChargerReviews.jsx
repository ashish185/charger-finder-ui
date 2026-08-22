"use client";

import { useEffect, useState } from "react";
import { ChargerService } from "@/services/chargerService";

function Stars({ rating }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} className="text-tertiary">
      {"★".repeat(rating)}
      <span className="text-outline-variant">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default function ChargerReviews({ chargerId }) {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    ChargerService.fetchChargerReviews(chargerId, { page: 1, limit: 5 })
      .then(({ reviews: list }) => {
        if (cancelled) return;
        setReviews(list);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load reviews:", err);
        setError(err?.message || "Could not load reviews.");
      });

    return () => {
      cancelled = true;
    };
  }, [chargerId]);

  if (error) {
    return <p className="mt-3 text-sm text-on-error-container">{error}</p>;
  }

  if (reviews === null) {
    return (
      <p className="mt-3 text-sm text-on-surface-variant">Loading reviews…</p>
    );
  }

  if (reviews.length === 0) {
    return (
      <p className="mt-3 text-sm text-on-surface-variant">
        No reviews yet for this charger.
      </p>
    );
  }

  return (
    <ul className="mt-3 space-y-3">
      {reviews.map((review) => (
        <li
          key={review.reviewId}
          className="rounded-lg border border-outline-variant/30 bg-surface-container-low p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-on-surface">
              {review.userName || "Anonymous"}
            </span>
            <Stars rating={review.rating} />
          </div>
          {review.comment && (
            <p className="mt-1 text-sm text-on-surface-variant">
              {review.comment}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
