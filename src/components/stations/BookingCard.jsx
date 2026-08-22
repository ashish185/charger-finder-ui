const STATUS_LABEL = {
  created: "Pending payment",
  attempted: "Pending payment",
  paid: "Confirmed",
  captured: "Confirmed",
  failed: "Failed",
};

const STATUS_STYLE = {
  created: "bg-tertiary-container/20 text-on-tertiary-container",
  attempted: "bg-tertiary-container/20 text-on-tertiary-container",
  paid: "bg-primary-container/20 text-on-primary-container",
  captured: "bg-primary-container/20 text-on-primary-container",
  failed: "bg-error-container text-on-error-container",
};

function formatAmount(amount, currency) {
  if (!Number.isFinite(amount)) return null;
  const value = (amount / 100).toFixed(2);
  return currency === "INR" ? `₹${value}` : `${value} ${currency ?? ""}`.trim();
}

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function BookingCard({ booking }) {
  const { orderId, status, amount, currency, estimatedPrice, createdAt } =
    booking;

  const amountLabel =
    formatAmount(amount, currency) ??
    (Number.isFinite(estimatedPrice) ? `₹${estimatedPrice.toFixed(2)}` : null);
  const statusKey = (status || "").toLowerCase();

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-on-surface">
            Booking #{String(orderId).slice(-6)}
          </h3>
          {formatDate(createdAt) && (
            <p className="mt-1 text-sm text-on-surface-variant">
              {formatDate(createdAt)}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
            STATUS_STYLE[statusKey] ?? "bg-surface-container text-on-surface-variant"
          }`}
        >
          {STATUS_LABEL[statusKey] ?? status ?? "Unknown"}
        </span>
      </div>

      {amountLabel && (
        <div className="mt-4 flex items-end justify-between border-t border-outline-variant/30 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant">Amount</span>
            <span className="text-lg font-semibold text-on-surface">
              {amountLabel}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
