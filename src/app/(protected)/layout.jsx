import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";
import AuthGateFireBase from "@/components/auth/AuthGateFirebase";

export default function ProtectedLayout({ children }) {
  return (
    <AuthGateFireBase>
      <div className="flex min-h-screen flex-col bg-surface">
        <header className="border-b border-outline-variant/40 bg-surface-container-lowest">
          <div className="mx-auto flex max-w-sm items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-lg">
                ⚡
              </span>
              <span className="text-sm font-semibold text-on-surface">
                ChargeFinder
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
              <Link href="/" className="hover:text-on-surface">
                Home
              </Link>
              <Link href="/dashboard" className="hover:text-on-surface">
                Dashboard
              </Link>
              <LogoutButton />
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </AuthGateFireBase>
  );
}
