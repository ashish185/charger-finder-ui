// Placeholder cards shown while stations or chargers are loading.
export default function CardSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
        >
          <div className="h-5 w-2/5 rounded bg-surface-container" />
          <div className="mt-2 h-4 w-3/5 rounded bg-surface-container" />
          <div className="mt-6 h-9 w-full rounded bg-surface-container" />
        </div>
      ))}
    </div>
  );
}
