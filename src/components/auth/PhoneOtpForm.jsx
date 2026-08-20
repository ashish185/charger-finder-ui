"use client";

import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useState } from "react";

function toE164(rawPhone) {
  const trimmed = rawPhone.trim();
  if (trimmed.startsWith("+")) {
    return `+${trimmed.slice(1).replace(/\D/g, "")}`;
  }
  const digits = trimmed.replace(/\D/g, "");
  return digits.startsWith("91") ? `+${digits}` : `+91${digits}`;
}

export default function PhoneOtpForm() {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [flow, setFlow] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isLoaded = Boolean(signIn && signUp);

  const handleSendCode = async (event) => {
    event.preventDefault();
    if (!isLoaded) return;

    const phoneNumber = toE164(phone);
    const digitCount = phoneNumber.replace(/\D/g, "").length;
    if (digitCount < 10 || digitCount > 15) {
      setErrorMessage("Enter a valid phone number");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const { error } = await signUp.create({ phoneNumber, strategy: "phone_code" });
      if (error) {
        throw error;
      }
      await signUp.verifications.sendPhoneCode();
      setFlow("sign-up");
      setStep("otp");
    } catch (error) {
      const clerkError = error?.errors?.[0] ?? error;

      if (clerkError?.code === "form_identifier_exists") {
        try {
          await signIn.create({ identifier: phoneNumber });
          await signIn.phoneCode.sendCode();
          setFlow("sign-in");
          setStep("otp");
          return;
        } catch (signInError) {
          setErrorMessage(
            signInError?.errors?.[0]?.longMessage || signInError?.message || "Something went wrong"
          );
          return;
        }
      }

      setErrorMessage(clerkError?.longMessage || clerkError?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (event) => {
    event.preventDefault();
    if (!isLoaded || !flow) return;

    setErrorMessage("");
    setIsSubmitting(true);
    try {
      if (flow === "sign-in") {
        const { error } = await signIn.phoneCode.verifyCode({ code });
        if (error) {
          throw error;
        }
        const { error: finalizeError } = await signIn.finalize();
        if (finalizeError) {
          throw finalizeError;
        }
      } else {
        const { error } = await signUp.verifications.verifyPhoneCode({ code });
        if (error) {
          throw error;
        }
        const { error: finalizeError } = await signUp.finalize();
        if (finalizeError) {
          throw finalizeError;
        }
      }
    } catch (error) {
      setErrorMessage(error?.errors?.[0]?.message || error?.message || "Invalid code");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "otp") {
    return (
      <form onSubmit={handleVerifyCode} className="flex w-full flex-col gap-4">
        <div>
          <h1 className="text-[20px] font-semibold leading-7 text-on-surface">
            Enter the code
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Sent to {toE164(phone)}
          </p>
        </div>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          inputMode="numeric"
          autoFocus
          placeholder="••••••"
          className="w-full rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-3 text-center text-lg tracking-[0.4em] text-on-surface focus:border-2 focus:border-primary-strong focus:outline-none"
        />

        {errorMessage && <p className="text-sm text-on-error-container">{errorMessage}</p>}

        <button
          type="submit"
          disabled={isSubmitting || code.length === 0}
          className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-on-primary disabled:opacity-50"
        >
          {isSubmitting ? "Verifying..." : "Verify & continue"}
        </button>

        <button
          type="button"
          onClick={() => {
            setStep("phone");
            setCode("");
            setErrorMessage("");
          }}
          className="text-sm text-secondary"
        >
          Use a different number
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSendCode} className="flex w-full flex-col gap-4">
      <div>
        <h1 className="text-[20px] font-semibold leading-7 text-on-surface">
          Log in with your phone
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          We&apos;ll text you a one-time code
        </p>
      </div>

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        inputMode="tel"
        autoFocus
        placeholder="9876543210 or +12015550100"
        className="w-full rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface focus:border-2 focus:border-primary-strong focus:outline-none"
      />

      {errorMessage && <p className="text-sm text-on-error-container">{errorMessage}</p>}

      <button
        type="submit"
        disabled={!isLoaded || isSubmitting || phone.trim().length === 0}
        className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-on-primary disabled:opacity-50"
      >
        {isSubmitting ? "Sending code..." : "Send code"}
      </button>
    </form>
  );
}
