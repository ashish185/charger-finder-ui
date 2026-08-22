"use client";

import { useBookings } from "@/hooks/useBookings";
import BookingCard from "@/components/stations/BookingCard";
import CardSkeleton from "@/components/stations/CardSkeleton";
import { STATE } from "@/app/constants";

export default function BookingsPage() {
  const { bookings, status, error, retry } = useBookings();

  return (
    <div className="mx-auto w-full max-w-sm px-4 py-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-on-surface">Your bookings</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Charging sessions you have booked
        </p>
      </header>

      <div>
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

        {status === STATE.SUCCESS && bookings.length === 0 && (
          <p className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 text-center text-sm text-on-surface-variant">
            You have no bookings yet.
          </p>
        )}

        {status === STATE.SUCCESS && bookings.length > 0 && (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <BookingCard key={booking.orderId} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
