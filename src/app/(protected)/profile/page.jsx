"use client";

import { useAuth } from "@/app/auth/provider";
import { STATE } from "@/app/constants";
import ThemeToggle from "@/components/ThemeToggle";

function initials(name) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { dateStyle: "medium" });
}

export default function ProfilePage() {
  const { user, userStatus } = useAuth();
  console.log("userStatus", userStatus);
  return (
    <div className="mx-auto w-full max-w-sm px-4 py-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-on-surface">Profile</h1>
        <ThemeToggle />
      </header>

      {userStatus === STATE.LOADING && (
        <div className="animate-pulse rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
          <div className="h-16 w-16 rounded-full bg-surface-container" />
          <div className="mt-4 h-5 w-2/5 rounded bg-surface-container" />
          <div className="mt-2 h-4 w-3/5 rounded bg-surface-container" />
        </div>
      )}

      {userStatus === STATE.ERROR && (
        <p className="rounded-xl bg-error-container p-4 text-sm text-on-error-container">
          Could not load your profile. Please try logging in again.
        </p>
      )}

      {userStatus === STATE.SUCCESS && user && (
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
              {initials(user.fullName)}
            </span>
            <div>
              <h2 className="text-lg font-semibold text-on-surface">
                {user.fullName || "Unnamed user"}
              </h2>
              {Array.isArray(user.role) && user.role.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {user.role.map((role) => (
                    <span
                      key={role}
                      className="rounded-full bg-primary-container/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-primary-container"
                    >
                      {role.replace("_", " ")}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <dl className="mt-6 space-y-3 border-t border-outline-variant/30 pt-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-on-surface-variant">Phone</dt>
              <dd className="font-medium text-on-surface">
                {user.phoneNumber || "—"}
              </dd>
            </div>
            {user.email && (
              <div className="flex items-center justify-between">
                <dt className="text-on-surface-variant">Email</dt>
                <dd className="font-medium text-on-surface">{user.email}</dd>
              </div>
            )}
            {formatDate(user.createdAt) && (
              <div className="flex items-center justify-between">
                <dt className="text-on-surface-variant">Member since</dt>
                <dd className="font-medium text-on-surface">
                  {formatDate(user.createdAt)}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {userStatus === STATE.SUCCESS && !user && (
        <p className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 text-center text-sm text-on-surface-variant">
          No profile data available.
        </p>
      )}
    </div>
  );
}
