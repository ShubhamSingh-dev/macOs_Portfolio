import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants";

interface WindowData {
  isOpen: boolean;
  zIndex: number;
  data: any;
}

interface WindowState {
  windows: Record<string, WindowData>;
  nextZIndex: number;
  openWindow: (windowKey: string, data?: any) => void;
  closeWindow: (windowKey: string) => void;
  focusWindow: (windowKey: string) => void;
}

const useWindowStore = create<WindowState>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (win) {
          win.isOpen = true;
          win.zIndex = state.nextZIndex;
          win.data = data;
          state.nextZIndex++;
        }
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (win) {
          win.zIndex = state.nextZIndex++;
        }
      }),
  }))
);

export default useWindowStore;
