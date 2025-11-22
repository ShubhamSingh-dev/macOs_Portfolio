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

    // Handle open animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

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
    }, [isOpen]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    // Don't render if window is not open
    if (!isOpen) return null;

    const handleClick = () => {
      focusWindow(windowKey);
    };

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        onClick={handleClick}
        className="absolute"
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
