import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SystemState {
  isSpotlightOpen: boolean;
  isDarkMode: boolean;
  toggleSpotlight: () => void;
  setSpotlight: (isOpen: boolean) => void;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

const useSystemStore = create<SystemState>()(
  persist(
    (set) => ({
      isSpotlightOpen: false,
      isDarkMode: false,
      toggleSpotlight: () =>
        set((state) => ({ isSpotlightOpen: !state.isSpotlightOpen })),
      setSpotlight: (isOpen) => set({ isSpotlightOpen: isOpen }),
      toggleDarkMode: () =>
        set((state) => {
          const newMode = !state.isDarkMode;
          if (newMode) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { isDarkMode: newMode };
        }),
      setDarkMode: (isDark) =>
        set(() => {
          if (isDark) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { isDarkMode: isDark };
        }),
    }),
    {
      name: "system-storage",
      partialize: (state) => ({ isDarkMode: state.isDarkMode }), // Only persist dark mode
    }
  )
);

export default useSystemStore;
