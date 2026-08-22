import { create } from "zustand";

// The chargers endpoint returns no station metadata, so the list page hands the
// clicked station over to the detail page here. A hard refresh leaves this
// empty — the detail page must render without it.
export const useSelectedStationStore = create((set) => ({
  station: null,
  selectStation: (station) => set({ station }),
  clearStation: () => set({ station: null }),
}));
