const LoginHeader = ({ confirmationResult }) => (
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
);

export default LoginHeader;
