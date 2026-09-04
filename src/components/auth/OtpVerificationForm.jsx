import { CheckIcon, EnterKeyIcon } from "@/components/icons/AuthIcons";

const OtpVerificationForm = ({ otp, onOtpChange, verifyingOtp, onSubmit, onUseDifferentNumber }) => (
    <form className="space-y-4" onSubmit={onSubmit}>
        <div>
            <label
                htmlFor="otp"
                className="mb-1.5 block text-sm font-medium text-on-surface"
            >
                Verification code
            </label>
            <div className="relative">
                <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6 digit OTP"
                    value={otp}
                    onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 pr-10 tracking-widest text-on-surface placeholder:text-on-surface-variant/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                {otp && !verifyingOtp && (
                    <EnterKeyIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/60" />
                )}
            </div>
        </div>
        <button
            type="submit"
            disabled={otp.length !== 6 || verifyingOtp}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-on-primary transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
            {!verifyingOtp && <CheckIcon className="h-4 w-4" />}
            {verifyingOtp ? "Verifying…" : "Verify OTP"}
        </button>
        <button
            type="button"
            onClick={onUseDifferentNumber}
            className="w-full text-sm font-medium text-secondary hover:underline"
        >
            Use a different number
        </button>
    </form>
);

export default OtpVerificationForm;
