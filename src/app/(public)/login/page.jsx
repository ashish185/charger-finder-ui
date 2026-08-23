"use client"
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../../firebase"; // Adjust the import path as necessary
import { authUrl } from "../../constants"
import { getPostAuthRoute } from "@/utils/auth";
import { useAuth } from "@/app/auth/provider";

async function handleResponse(res, fallbackMessage) {
    const text = await res.text();
    let data = null;

    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }
    console.log('err', res);
    if (!res.ok) {
        const message = parseError(data, fallbackMessage);
        throw new Error(message);
    }

    return data !== null ? data : {};
}


const phoneLogin = async (idToken) => {
    const res = await fetch(`${authUrl}/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken }),
    });

    return handleResponse(res, "Login failed");
}

export default function PhoneLogin() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [error, setError] = useState("");
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const recaptchaVerifierRef = useRef(null);
    const { setUser } = useAuth();

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

    const sendOtp = async () => {
        setError("");
        setupRecaptcha();
        setSendingOtp(true);
        try {
            const result = await signInWithPhoneNumber(
                auth,
                phone, // must be E.164 format, e.g. +919876543210
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
            const { user } = await phoneLogin(idToken) ?? {};
            if(user){
                setUser(user);
            }
            router.push(getPostAuthRoute(user));
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
                            <input
                                id="phone"
                                type="tel"
                                placeholder="+91XXXXXXXXXX"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-on-surface placeholder:text-on-surface-variant/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <button
                            onClick={sendOtp}
                            disabled={!phone || sendingOtp}
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
}
