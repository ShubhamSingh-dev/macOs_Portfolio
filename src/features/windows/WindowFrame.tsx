import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import useWindowStore from "../../store/window";
import WindowControls from "./components/WindowControls";

gsap.registerPlugin(Draggable);

interface WindowFrameProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  className?: string;
}

const WindowFrame = ({ 
  id, 
  title, 
  children, 
  defaultWidth = 800, 
  defaultHeight = 600,
  className = "" 
}: WindowFrameProps) => {
  const { windows, focusWindow } = useWindowStore();
  const windowState = windows[id];
  const ref = useRef<HTMLElement>(null);
  const draggableRef = useRef<Draggable[]>([]);

  if (!windowState?.isOpen) return null;

  const { zIndex, isMinimized, isMaximized } = windowState;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (draggableRef.current.length > 0) {
      draggableRef.current.forEach(d => d.kill());
    }

    const instance = Draggable.create(el, {
      trigger: el.querySelector(".window-header"),
      bounds: "body",
      onPress: () => focusWindow(id),
      onDrag: () => focusWindow(id),
      zIndexBoost: false, // Managed manually
    });

    draggableRef.current = instance;

    return () => {
      instance.forEach(d => d.kill());
    };
  }, [id, focusWindow]);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    if (isMinimized) {
      gsap.to(el, {
        scale: 0,
        opacity: 0,
        y: 100,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          el.style.display = "none";
        }
      });
    } else {
      el.style.display = "block";
      gsap.to(el, {
        scale: isMaximized ? 1 : 1, // Logic for maximize could be added here
        opacity: 1,
        y: 0,
        width: isMaximized ? "100vw" : defaultWidth,
        height: isMaximized ? "100vh" : defaultHeight,
        top: isMaximized ? 0 : undefined,
        left: isMaximized ? 0 : undefined,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isMinimized, isMaximized]);

  // Initial open animation
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(el, 
      { scale: 0.8, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }
    );
  }, []);

  return (
    <section
  ref={ref}
  className={`absolute glass-window rounded-xl overflow-hidden flex flex-col
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    ${className}
    w-[${defaultWidth}] h-[${defaultHeight}] z-[${zIndex}]
  `}
  onMouseDown={() => focusWindow(id)}
>

      {/* Header */}
      <div className="window-header flex items-center justify-between px-4 py-3 bg-gray-100/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md select-none">
        <WindowControls windowId={id} />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex-1 text-center mx-4 truncate">
          {title}
        </span>
        <div className="w-14" /> {/* Spacer for balance */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto relative">
        {children}
      </div>
    </section>
  );
};

export default WindowFrame;
