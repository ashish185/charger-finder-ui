const inputClasses =
  "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-on-surface placeholder:text-on-surface-variant/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

const FormField = ({ id, label, optional, ...inputProps }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-on-surface">
      {label}
      {optional && <span className="text-on-surface-variant"> (optional)</span>}
    </label>
    <input id={id} className={inputClasses} {...inputProps} />
  </div>
);

export default FormField;
