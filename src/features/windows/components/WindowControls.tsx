import { X, Minus, Maximize2 } from "lucide-react";
import useWindowStore from "../../../store/window";

interface WindowControlsProps {
  windowId: string;
}

const WindowControls = ({ windowId }: WindowControlsProps) => {
  const { closeWindow, toggleMinimize, toggleMaximize } = useWindowStore();

  return (
    <div className="flex items-center gap-2 group">
      <button
        onClick={(e) => {
          e.stopPropagation();
          closeWindow(windowId);
        }}
        className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E] flex items-center justify-center hover:brightness-90 transition-all"
        aria-label="Close"
      >
        <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMinimize(windowId);
        }}
        className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24] flex items-center justify-center hover:brightness-90 transition-all"
        aria-label="Minimize"
      >
        <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMaximize(windowId);
        }}
        className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29] flex items-center justify-center hover:brightness-90 transition-all"
        aria-label="Maximize"
      >
        <Maximize2 className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
      </button>
    </div>
  );
};

export default WindowControls;
