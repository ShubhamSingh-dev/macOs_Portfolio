import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants";

interface WindowData {
  isOpen: boolean;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  data: any;
}

interface WindowState {
  windows: Record<string, WindowData>;
  nextZIndex: number;
  openWindow: (windowKey: string, data?: any) => void;
  closeWindow: (windowKey: string) => void;
  focusWindow: (windowKey: string) => void;
  toggleMinimize: (windowKey: string) => void;
  toggleMaximize: (windowKey: string) => void;
}

const useWindowStore = create<WindowState>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (win) {
          // Always assign a fresh z-index when opening
          const newZIndex = state.nextZIndex++;
          win.isOpen = true;
          win.zIndex = newZIndex;
          win.isMinimized = false;
          win.isMaximized = false;
          win.data = data;
          console.log(`Opening ${windowKey} with z-index: ${newZIndex}`);
        }
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.isMinimized = false;
        win.isMaximized = false;
        win.data = null;
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (win && !win.isMinimized) {
          win.zIndex = state.nextZIndex++;
        }
      }),
    toggleMinimize: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (win) {
          win.isMinimized = !win.isMinimized;
          if (win.isMinimized) {
            win.isMaximized = false; // Reset max when minimized
          } else {
             win.zIndex = state.nextZIndex++; // Bring to front when restoring
          }
        }
      }),
    toggleMaximize: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (win) {
          win.isMaximized = !win.isMaximized;
          if (win.isMaximized) {
            win.isMinimized = false; // Ensure not minimized
            win.zIndex = state.nextZIndex++;
          }
        }
      }),
  }))
);

export default useWindowStore;