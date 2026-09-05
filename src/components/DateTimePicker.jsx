const inputClasses =
  "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

const DateTimePicker = ({ id, label, value, onChange, min, max, required }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-on-surface">
      {label}
    </label>
    <input
      id={id}
      type="datetime-local"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      required={required}
      className={inputClasses}
    />
  </div>
);

export default DateTimePicker;
