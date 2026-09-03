"use client"
import OtpVerificationForm from "@/components/auth/OtpVerificationForm";
import PhoneNumberForm from "@/components/auth/PhoneNumberForm";
import LoginHeader from "@/components/auth/presentational/LoginHeader";
import { usePhoneAuth } from "@/hooks/usePhoneAuth";
import { Suspense } from "react";

const PhoneLogin = () => {
    const {
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
    } = usePhoneAuth();

    return (
        <div className="flex min-h-screen items-center justify-center bg-surface px-4">
            <div id="recaptcha-container"></div>

            <div className="w-full max-w-sm rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-sm">
                <LoginHeader confirmationResult={confirmationResult} />

                {error && (
                    <div className="mb-4 rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container">
                        {error}
                    </div>
                )}

                {!confirmationResult ? (
                    <PhoneNumberForm
                        phone={phone}
                        onPhoneChange={updatePhone}
                        isValidPhone={isValidPhone}
                        sendingOtp={sendingOtp}
                        onSubmit={sendOtp}
                    />
                ) : (
                    <OtpVerificationForm
                        otp={otp}
                        onOtpChange={setOtp}
                        verifyingOtp={verifyingOtp}
                        onSubmit={verifyOtp}
                        onUseDifferentNumber={resetToPhoneStep}
                    />
                )}
            </div>
        </div>
    );
};

const LoginPage = () => (
    <Suspense fallback={null}>
        <PhoneLogin />
    </Suspense>
);

export default LoginPage;
