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
          item.id === activeLocation?.id ? "active" : "non-active"
        )}
      >
        <img src={item.icon} className="w-4" alt={item.name} />
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

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favorites</h3>
            <ul>{renderList(Object.values(locations))}</ul>
          </div>
          <div>
            <h3>Work</h3>
            <ul>{renderList(locations.work.children)}</ul>
          </div>
        </div>

        <ul className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={(e) => openItem(item, e)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const finderWindow = windowWrapper(Finder, "finder");

export default finderWindow;
