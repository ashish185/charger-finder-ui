"use client";

import { useEffect, useRef } from "react";
import { EnterKeyIcon, SendIcon } from "@/components/icons/AuthIcons";

const stripCountryCode = (digits) => {
    // Pasted numbers often include the +91 country code; drop it so only the 10 digit number remains.
    if (digits.length > 10 && digits.startsWith("91")) {
        return digits.slice(2);
    }
    return digits;
};

const PhoneNumberForm = ({ phone, onPhoneChange, isValidPhone, sendingOtp, onSubmit }) => {
    const phoneInputRef = useRef(null);

    useEffect(() => {
        phoneInputRef.current?.focus();
    }, []);

    return (
    <form className="space-y-4" onSubmit={onSubmit}>
        <div>
            <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-on-surface"
            >
                Phone number
            </label>
            <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-lowest focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <span className="pl-3.5 pr-2 text-on-surface-variant">
                    +91
                </span>
                <input
                    ref={phoneInputRef}
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="XXXXXXXXXX"
                    value={phone}
                    onChange={(e) => onPhoneChange(stripCountryCode(e.target.value.replace(/\D/g, "")).slice(0, 10))}
                    className="w-full rounded-r-lg bg-transparent py-2.5 pr-3.5 text-on-surface placeholder:text-on-surface-variant/60 outline-none"
                />
                {isValidPhone && !sendingOtp && (
                    <EnterKeyIcon className="mr-3.5 h-4 w-4 shrink-0 text-on-surface-variant/60" />
                )}
            </div>
        </div>
        <button
            type="submit"
            disabled={!isValidPhone || sendingOtp}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-on-primary transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
            {!sendingOtp && <SendIcon className="h-4 w-4" />}
            {sendingOtp ? "Sending OTP…" : "Send OTP"}
        </button>
    </form>
    );
};

export default PhoneNumberForm;
