import { getPostAuthRoute } from "@/utils/auth";
import { PhoneService } from "@/services/phoneService";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { auth } from "@/firebase";

const PHONE_STORAGE_KEY = "chargefinder_phone";

export const usePhoneAuth = () => {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [error, setError] = useState("");
    const [sendingOtp, setSendingOtp] = useState(false);    
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const recaptchaVerifierRef = useRef(null);
    const pathName = usePathname();

    useEffect(() => {
        // Read localStorage only after mount so the client's first render matches
        // the server's (which has no access to it), avoiding a hydration mismatch.
        const storedPhone = window.localStorage.getItem(PHONE_STORAGE_KEY);
        if (storedPhone) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPhone(storedPhone);
        }
    }, []);

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

    const updatePhone = (digits) => {
        setPhone(digits);
        window.localStorage.setItem(PHONE_STORAGE_KEY, digits);
    };

    const sendOtp = async (e) => {
        e?.preventDefault();
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

    const verifyOtp = async (e) => {
        e?.preventDefault();
        setError("");
        setVerifyingOtp(true);
        try {
            const userCredential = await confirmationResult.confirm(otp);
            const idToken = await userCredential.user.getIdToken();
            // Send this token to your Express backend
            const { user } = await PhoneService.phoneLogin(idToken) ?? {};
            const newPath = getPostAuthRoute(user, pathName);
            await new Promise((resolve) => setTimeout(resolve, 4000));
            if(pathName !== newPath){
                router.push(newPath);
                return;
            }
        } catch (err) {
            console.error("OTP verification failed:", err);
            setError("That code didn't work. Please check it and try again.");
        } finally {
            setVerifyingOtp(false);
        }
    };

    const resetToPhoneStep = () => {
        setConfirmationResult(null);
        setOtp("");
        setError("");
    };

    return {
        phone,
        updatePhone,
        otp,
        setOtp,
        confirmationResult,
        error,
        sendingOtp,
        verifyingOtp,
        isValidPhone,
        sendOtp,
        verifyOtp,
        resetToPhoneStep,
    };
};
