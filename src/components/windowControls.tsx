import useWindowStore from "../store/window";
import { X, Minus, Plus } from "lucide-react";

const WindowControls = ({ target }: { target: string }) => {
  const { closeWindow } = useWindowStore();

  return (
    <div id="window-controls" className="flex gap-2 group">
      <div 
        className="close w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center cursor-pointer" 
        onClick={(e) => {
          e.stopPropagation();
          closeWindow(target);
        }}
      >
        <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="minimize w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center cursor-pointer">
        <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="maximize w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center cursor-pointer">
        <Plus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

export default WindowControls;
