"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth/provider";
import { UserService } from "@/service/user";
import { ROLE } from "@/app/constants";

export default function SelectRolePage() {
  const router = useRouter();
  const { user, loginSuccess } = useAuth();
  const [submittingRole, setSubmittingRole] = useState(null);
  const [error, setError] = useState("");

  const chooseRole = async (role) => {
    setError("");
    setSubmittingRole(role);
    try {
      const response = await UserService.setRole(role);
      const updatedUser = response?.user ?? response?.data ?? { ...user, role };
      loginSuccess(updatedUser);
      router.replace("/dashboard");
    } catch (err) {
      console.error("Failed to set role:", err);
      setError("Couldn't save your role. Please try again.");
    } finally {
      setSubmittingRole(null);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-semibold text-on-surface">
            How will you use ChargeFinder?
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Choose a role to continue
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => chooseRole(ROLE.OPERATOR)}
            disabled={submittingRole !== null}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-on-primary transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submittingRole === ROLE.OPERATOR ? "Saving…" : "Operator"}
          </button>
          <button
            onClick={() => chooseRole(ROLE.CUSTOMER)}you
            disabled={submittingRole !== null}
            className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest py-2.5 text-sm font-semibold text-on-surface transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submittingRole === ROLE.CUSTOMER ? "Saving…" : "Driver"}
          </button>
        </div>
      </div>
    </div>
  );
}
