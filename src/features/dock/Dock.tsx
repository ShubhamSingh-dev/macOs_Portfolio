import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tooltip } from "react-tooltip";
import useWindowStore from "../../store/window";
import { dockApps } from "../../constants";

const Dock = () => {
  const dockRef = useRef<HTMLDivElement>(null);
  const { openWindow, windows } = useWindowStore();

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const icons = document.querySelectorAll(".dock-icon");
      
      icons.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            y: -10,
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, dockRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      id="dock" 
      ref={dockRef}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 select-none max-sm:hidden pb-2"
    >
      <div className="flex items-end gap-3 p-3 rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl glass">
        {dockApps.map((item) => (
          <div
            key={item.id}
            className="dock-icon relative group flex flex-col items-center gap-1"
            onClick={() => openWindow(item.id)}
            data-tooltip-id="dock-tooltip"
            data-tooltip-content={item.name}
            data-dock-id={item.id}
          >
            <div className="w-12 h-12 3xl:w-16 3xl:h-16 transition-all duration-200">
              <img
                src={`/images/${item.icon}`}
                alt={item.name}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            
            {/* Active Indicator */}
            <div 
              className={`w-1 h-1 rounded-full bg-black dark:bg-white opacity-0 transition-opacity duration-300 ${
                windows[item.id]?.isOpen ? "opacity-100" : ""
              }`} 
            />
          </div>
        ))}
      </div>
      
      <Tooltip
        id="dock-tooltip"
        place="top"
        offset={20}
        className="bg-gray-800/90! backdrop-blur-md! px-3! py-1! rounded-lg! text-xs! font-medium! shadow-xl! border! border-white/10!"
        noArrow
      />
    </div>
  );
};

export default Dock;
