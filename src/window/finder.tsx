import { Search } from "lucide-react";
import { WindowControls } from "../components";
import windowWrapper from "../hoc/windowWrapper";
import useLocationStore from "../store/location";
import { locations } from "../constants";
import clsx from "clsx";
import type { JSX } from "react";
import useWindowStore from "../store/window";

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  interface LocationItem {
    id: string | number;
    icon: string;
    name: string;
    children?: LocationItem[];
  }

  const renderList = (items: LocationItem[]): JSX.Element[] =>
    items.map((item: LocationItem) => (
      <li
        key={item.id}
        onClick={() => setActiveLocation(item as any)}
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors",
          item.id === activeLocation?.id 
            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200" 
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
        )}
      >
        <img src={item.icon} className="w-4 dark:invert" alt={item.name} />
        <p className="text-sm font-medium truncate">{item.name}</p>
      </li>
    ));

  const openItem = (item: any, event: React.MouseEvent) => {
    // Prevent event from bubbling to Finder's onClick (which would focus Finder)
    event.stopPropagation();

    if (item.fileType === "pdf") {
      openWindow("resume");
      return;
    }

    if (item.kind === "folder") {
      setActiveLocation(item);
      return;
    }

    if (["fig", "url"].includes(item.fileType) && item.href) {
      window.open(item.href, "_blank");
      return;
    }

    // Open txt or img files with fresh z-index
    const windowKey = `${item.fileType}${item.kind}`;
    console.log(`Opening ${windowKey} for ${item.name}`);
    openWindow(windowKey, item);
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] flex h-full">
        <div className="w-48 bg-gray-50 dark:bg-[#252525] border-r border-gray-200 dark:border-gray-700 flex flex-col p-5 space-y-3">
          <div>
            <h3 className="text-xs font-medium text-gray-400 mb-1">Favorites</h3>
            <ul className="space-y-1">{renderList(Object.values(locations))}</ul>
          </div>
          <div>
            <h3 className="text-xs font-medium text-gray-400 mb-1">Work</h3>
            <ul className="space-y-1">{renderList(locations.work.children)}</ul>
          </div>
        </div>

        <ul className="flex-1 p-8 bg-white dark:bg-[#1e1e1e] max-w-2xl relative">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={`absolute flex items-center flex-col gap-3 ${item.position}`}
              onClick={(e) => openItem(item, e)}
            >
              <img src={item.icon} alt={item.name} className="object-contain object-center size-16 relative group-hover:scale-105 transition-transform" />
              <p className="text-sm text-center font-medium w-40 text-gray-800 dark:text-gray-200">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const finderWindow = windowWrapper(Finder, "finder");

export default finderWindow;
