"use client"
import { getPostAuthRoute } from "@/utils/auth";
import { PhoneService } from "@/services/phoneService";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { auth } from "../../../firebase"; // Adjust the import path as necessary

const PHONE_STORAGE_KEY = "chargefinder_phone";

const PhoneLogin = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [phone, setPhone] = useState(() =>
        typeof window === "undefined" ? "" : window.localStorage.getItem(PHONE_STORAGE_KEY) ?? ""
    );
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [error, setError] = useState("");
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const recaptchaVerifierRef = useRef(null);

    const setupRecaptcha = () => {
        // reCAPTCHA must be set up once, tied to a DOM node
        if (!recaptchaVerifierRef.current) {
            recaptchaVerifierRef.current = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                { size: "invisible" }
            );
        }
    };

    const isValidPhone = phone.length === 10;

    const sendOtp = async () => {
        setError("");
        if (!isValidPhone) {
            setError("Enter a valid 10 digit phone number.");
            return;
        }
        setupRecaptcha();
        setSendingOtp(true);
        try {
            const result = await signInWithPhoneNumber(
                auth,
                `+91${phone}`, // must be E.164 format, e.g. +919876543210
                recaptchaVerifierRef.current
            );
            setConfirmationResult(result);
        } catch (err) {
            console.error("OTP send failed:", err);
            setError("Couldn't send the OTP. Check the number and try again.");
            // Reset recaptcha on failure so user can retry
            recaptchaVerifierRef.current?.clear();
            recaptchaVerifierRef.current = null;
        } finally {
            setSendingOtp(false);
        }
    };

    const verifyOtp = async () => {
        setError("");
        setVerifyingOtp(true);
        try {
            const userCredential = await confirmationResult.confirm(otp);
            const idToken = await userCredential.user.getIdToken();
            // Send this token to your Express backend
            const { user } = await PhoneService.phoneLogin(idToken) ?? {};
            const redirectPath = searchParams.get("redirect");
            const isSafeRedirect = redirectPath?.startsWith("/") && !redirectPath.startsWith("//");
            router.push(isSafeRedirect ? redirectPath : getPostAuthRoute(user));
        } catch (err) {
            console.error("OTP verification failed:", err);
            setError("That code didn't work. Please check it and try again.");
        } finally {
            setVerifyingOtp(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-surface px-4">
            <div id="recaptcha-container"></div>

            <div className="w-full max-w-sm rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
                        ⚡
                    </div>
                    <h1 className="text-xl font-semibold text-on-surface">
                        Welcome to ChargeFinder
                    </h1>
                    <p className="mt-1 text-sm text-on-surface-variant">
                        {confirmationResult
                            ? "Enter the code we sent you"
                            : "Sign in with your phone number"}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container">
                        {error}
                    </div>
                )}

                {!confirmationResult ? (
                    <div className="space-y-4">
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
                                    id="phone"
                                    type="tel"
                                    inputMode="numeric"
                                    placeholder="XXXXXXXXXX"
                                    maxLength={10}
                                    value={phone}
                                    onChange={(e) => {
                                        const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                                        setPhone(digits);
                                        window.localStorage.setItem(PHONE_STORAGE_KEY, digits);
                                    }}
                                    className="w-full rounded-r-lg bg-transparent py-2.5 pr-3.5 text-on-surface placeholder:text-on-surface-variant/60 outline-none"
                                />
                            </div>
                        </div>
                        <button
                            onClick={sendOtp}
                            disabled={!isValidPhone || sendingOtp}
                            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-on-primary transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {sendingOtp ? "Sending OTP…" : "Send OTP"}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="otp"
                                className="mb-1.5 block text-sm font-medium text-on-surface"
                            >
                                Verification code
                            </label>
                            <input
                                id="otp"
                                type="text"
                                inputMode="numeric"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 tracking-widest text-on-surface placeholder:text-on-surface-variant/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <button
                            onClick={verifyOtp}
                            disabled={!otp || verifyingOtp}
                            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-on-primary transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {verifyingOtp ? "Verifying…" : "Verify OTP"}
                        </button>
                        <button
                            onClick={() => {
                                setConfirmationResult(null);
                                setOtp("");
                                setError("");
                            }}
                            className="w-full text-sm font-medium text-secondary hover:underline"
                        >
                            Use a different number
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const LoginPage = () => {
    return (
        <Suspense fallback={null}>
            <PhoneLogin />
        </Suspense>
    );
};

export default LoginPage;
