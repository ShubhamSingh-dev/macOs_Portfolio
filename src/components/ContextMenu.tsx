import React, { useEffect, useRef, useLayoutEffect } from "react";
import useWindowStore from "../store/window";
import { RefreshCw, Image, FolderPlus } from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
  close: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, close }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindowStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  const handleRefresh = () => {
    window.location.reload();
    close();
  };

  const handleChangeWallpaper = () => {
    openWindow("system");
    close();
  };

  const handleNewFolder = () => {
    // Just visual for now
    alert("New Folder functionality coming soon!");
    close();
  };

  // Define styles separately to avoid inline style linting warnings
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty("--context-menu-x", `${x}px`);
      ref.current.style.setProperty("--context-menu-y", `${y}px`);
    }
  }, [x, y]);

  return (
    <div
      ref={ref}
      className="context-menu"
      onContextMenu={(e) => e.preventDefault()}
    >
      <button
        type="button"
        onClick={handleNewFolder}
        className="flex items-center gap-2 px-4 py-1.5 hover:bg-blue-500 hover:text-white text-sm text-gray-700 dark:text-gray-200 transition-colors text-left"
      >
        <FolderPlus className="w-4 h-4" />
        New Folder
      </button>
      <div className="h-px bg-gray-200 dark:bg-gray-700 my-1 mx-2" />
      <button
      type="button"
        onClick={handleRefresh}
        className="flex items-center gap-2 px-4 py-1.5 hover:bg-blue-500 hover:text-white text-sm text-gray-700 dark:text-gray-200 transition-colors text-left"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh
      </button>
      <button
      type="button"
        onClick={handleChangeWallpaper}
        className="flex items-center gap-2 px-4 py-1.5 hover:bg-blue-500 hover:text-white text-sm text-gray-700 dark:text-gray-200 transition-colors text-left"
      >
        <Image className="w-4 h-4" />
        Change Wallpaper
      </button>
    </div>
  );
};

export default ContextMenu;
