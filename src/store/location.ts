import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "../constants";

const DEFAULT_LOCATION = locations.work;

interface LocationState {
  activeLocation: typeof DEFAULT_LOCATION | null;
  setActiveLocation: (location?: typeof DEFAULT_LOCATION | null) => void;
  resetActiveLocation: () => void;
}

const useLocationStore = create<LocationState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    setActiveLocation: (location = null) =>
      set((state) => {
        state.activeLocation = location;
      }),
    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;
