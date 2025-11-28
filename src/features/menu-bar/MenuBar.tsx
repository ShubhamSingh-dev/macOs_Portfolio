import { useState, useEffect, useRef } from "react";
import { Apple } from "lucide-react";
import CalendarWidget from "./CalendarWidget";
import useWindowStore from "../../store/window";

const MenuBar = () => {
  const [time, setTime] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const appleMenuRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindowStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
      if (appleMenuRef.current && !appleMenuRef.current.contains(event.target as Node)) {
        setIsAppleMenuOpen(false);
      }
    };

    if (isCalendarOpen || isAppleMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen, isAppleMenuOpen]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 py-1.5 select-none text-sm glass text-black dark:text-white transition-colors duration-300">
      <div className="flex items-center gap-5">
        <div className="relative" ref={appleMenuRef}>
          <div 
            className={`cursor-pointer hover:opacity-70 transition-opacity p-1 ${isAppleMenuOpen ? "bg-white/20 rounded" : ""}`}
            onClick={() => setIsAppleMenuOpen(!isAppleMenuOpen)}
          >
            <Apple className="w-4 h-4 fill-current" />
          </div>
          
          {isAppleMenuOpen && (
            <div className="absolute top-8 left-0 w-56 bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 py-1 z-50">
              <div className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-sm font-medium transition-colors border-b border-gray-200/50 dark:border-gray-700/50">
                About This Mac
              </div>
              <div 
                className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-sm font-medium transition-colors"
                onClick={() => {
                  openWindow("system");
                  setIsAppleMenuOpen(false);
                }}
              >
                System Settings...
              </div>
              <div className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-sm font-medium transition-colors border-b border-gray-200/50 dark:border-gray-700/50">
                App Store...
              </div>
              <div className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-sm font-medium transition-colors">
                Sleep
              </div>
              <div className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-sm font-medium transition-colors">
                Restart...
              </div>
              <div className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-sm font-medium transition-colors">
                Shut Down...
              </div>
            </div>
          )}
        </div>

        <ul className="flex items-center gap-5 max-sm:hidden font-medium">
          {["Finder", "File", "Edit", "View", "Go", "Window", "Help"].map((item) => (
            <li 
              key={item} 
              className="cursor-pointer hover:opacity-70 transition-opacity active:scale-95"
              onClick={() => console.log(`${item} clicked`)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 max-sm:hidden">
          {/* Status Icons could go here */}
        </div>
        <div className="relative" ref={calendarRef}>
          <time 
            className="font-medium cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          >
            {formatDate(time)} {formatTime(time)}
          </time>
          {isCalendarOpen && <CalendarWidget />}
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
