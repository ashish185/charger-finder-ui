"use client";

import { useAppUserStore } from "@/hooks/useAppUserStore";
import { VEHICLE_TYPES } from "@/utils/vehicles";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function RegisterPage() {
  const { isLoaded, user } = useUser();
  const { getToken } = useAuth();
  const completeRegistration = useAppUserStore((state) => state.completeRegistration);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [vehicleType, setVehicleType] = useState(VEHICLE_TYPES[0].id);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Please enter your full name");
      return;
    }
    if (!manufacturer.trim() || !model.trim()) {
      setErrorMessage("Please enter your vehicle's manufacturer and model");
      return;
    }

    const phone = user?.primaryPhoneNumber?.phoneNumber;
    if (!phone) {
      setErrorMessage("No phone number found on this account");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const token = await getToken();
      await completeRegistration({
        phone,
        name: name.trim(),
        email: email.trim(),
        manufacturer: manufacturer.trim(),
        model: model.trim(),
        vehicleType,
        token,
      });
    } catch (err) {
      setErrorMessage(err.message ?? "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || !user) return null;

  return (
    <div className="flex flex-1 justify-center bg-surface px-5 py-10">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-6 rounded-lg border border-outline-variant bg-surface-container-lowest p-6"
      >
        <div>
          <h1 className="text-[20px] font-semibold leading-7 text-on-surface">
            Complete your profile
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Tell us about you and your vehicle
          </p>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
            Profile
          </h2>

          <label className="flex flex-col gap-1 text-sm text-on-surface">
            Full name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              autoCapitalize="words"
              className="rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface focus:border-2 focus:border-primary-strong focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-on-surface">
            Email (optional)
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="jane@example.com"
              className="rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface focus:border-2 focus:border-primary-strong focus:outline-none"
            />
          </label>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
            Vehicle
          </h2>

          <label className="flex flex-col gap-1 text-sm text-on-surface">
            Manufacturer
            <input
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              placeholder="Tata Motors"
              className="rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface focus:border-2 focus:border-primary-strong focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-on-surface">
            Model
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Nexon EV"
              className="rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface focus:border-2 focus:border-primary-strong focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-on-surface">
            Vehicle type
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface focus:border-2 focus:border-primary-strong focus:outline-none"
            >
              {VEHICLE_TYPES.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.label}
                </option>
              ))}
            </select>
          </label>
        </section>

        {errorMessage && <p className="text-sm text-on-error-container">{errorMessage}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-on-primary disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
