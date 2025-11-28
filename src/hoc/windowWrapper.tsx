import React, { useLayoutEffect, useRef, useEffect } from "react";
import useWindowStore from "../store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

interface WindowWrapperProps {
  [key: string]: any;
}

const windowWrapper = (
  Component: React.ComponentType<any>,
  windowKey: string
) => {
  const Wrapped = (props: WindowWrapperProps) => {
    const { focusWindow, windows } = useWindowStore();
    const window = windows[windowKey];

    // Safety check
    if (!window) {
      console.error(`Window with key "${windowKey}" not found`);
      return null;
    }

    const { isOpen, zIndex } = window;
    const ref = useRef<HTMLElement>(null);
    const draggableRef = useRef<Draggable[]>([]);
    const prevDataRef = useRef(window.data);

    // Handle draggable creation and cleanup
    useEffect(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      // Kill any existing draggable instances
      if (draggableRef.current.length > 0) {
        draggableRef.current.forEach((instance) => instance.kill());
        draggableRef.current = [];
      }

      // Create new draggable instance
      const instance = Draggable.create(el, {
        trigger: el.querySelector("#window-header"), // Only drag from header
        bounds: "body",
        onPress: function () {
          focusWindow(windowKey);
        },
        onDrag: function () {
          // Ensure window stays focused while dragging
          focusWindow(windowKey);
        },
      });

      draggableRef.current = instance;

      return () => {
        if (draggableRef.current.length > 0) {
          draggableRef.current.forEach((inst) => inst.kill());
          draggableRef.current = [];
        }
      };
    }, [isOpen, focusWindow, windowKey]);

    // Handle open animation - trigger when data changes or window opens
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      // Update the ref to track data changes
      prevDataRef.current = window.data;

      el.style.display = "block";

      // Find origin element (dock icon)
      const dockIcon = document.querySelector(`[data-dock-id="${windowKey}"]`);
      const origin = dockIcon?.getBoundingClientRect();

      if (origin) {
        const { left, top, width, height } = origin;
        const x = left + width / 2;
        const y = top + height / 2;
        
        // Get window center
        const winRect = el.getBoundingClientRect();
        const winX = winRect.left + winRect.width / 2;
        const winY = winRect.top + winRect.height / 2;

        gsap.fromTo(
          el,
          {
            x: x - winX,
            y: y - winY,
            scale: 0,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.75)",
          }
        );
      } else {
        // Fallback animation
        gsap.fromTo(
          el,
          {
            scale: 0.8,
            opacity: 0,
            y: 40,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power3.out",
          }
        );
      }
    }, [isOpen, window.data]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
      // Set z-index via CSS variable directly on the element
      el.style.setProperty("--window-z-index", zIndex.toString());
    }, [isOpen, zIndex]);

    // Don't render if window is not open
    if (!isOpen) return null;

    const handleClick = () => {
      focusWindow(windowKey);
    };

    return (
      <section
        id={windowKey}
        ref={ref}
        onClick={handleClick}
        className="window-wrapper"
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `windowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default windowWrapper;