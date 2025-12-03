import { } from "lucide-react";
import WindowFrame from "../WindowFrame";
import useLocationStore from "../../../store/location";
import useWindowStore from "../../../store/window";
import { locations } from "../../../constants";
import clsx from "clsx";
import type { JSX } from "react";

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

    const windowKey = `${item.fileType}${item.kind}`;
    openWindow(windowKey, item);
  };

  return (
    <WindowFrame id="finder" title="Finder" defaultWidth={800} defaultHeight={500}>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50/50 dark:bg-[#252525]/50 border-r border-gray-200 dark:border-gray-700 flex flex-col p-5 space-y-3 backdrop-blur-sm">
          <div>
            <h3 className="text-xs font-medium text-gray-400 mb-1">Favorites</h3>
            <ul className="space-y-1">{renderList(Object.values(locations))}</ul>
          </div>
          <div>
            <h3 className="text-xs font-medium text-gray-400 mb-1">Work</h3>
            <ul className="space-y-1">{renderList(locations.work.children)}</ul>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 bg-white dark:bg-[#1e1e1e] relative overflow-y-auto">
          <ul className="grid grid-cols-4 gap-4">
            {activeLocation?.children.map((item) => (
              <li
                key={item.id}
                className="flex flex-col items-center gap-2 group cursor-pointer p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                onClick={(e) => openItem(item, e)}
              >
                <img 
                  src={item.icon} 
                  alt={item.name} 
                  className="w-16 h-16 object-contain group-hover:scale-105 transition-transform" 
                />
                <p className="text-sm text-center font-medium text-gray-800 dark:text-gray-200 wrap-break-word w-full">
                  {item.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WindowFrame>
  );
};

export default Finder;
