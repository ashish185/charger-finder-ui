import PhoneOtpForm from "@/components/auth/PhoneOtpForm";

export default function SignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-surface px-5">
      <div className="w-full max-w-sm rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
        <PhoneOtpForm />
        <div id="clerk-captcha" />
      </div>
    </div>
  );
}
