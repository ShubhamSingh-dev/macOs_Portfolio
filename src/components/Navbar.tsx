import { navIcons, navLinks } from "../constants";
import dayjs from "dayjs";
import useWindowStore from "../store/window";
import useSystemStore from "../store/system";
import { useState } from "react";
import CalendarWidget from "./CalendarWidget";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { toggleSpotlight, toggleDarkMode } = useSystemStore();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleIconClick = (id: number) => {
    if (id === 2) toggleSpotlight(); // Search icon
    if (id === 4) toggleDarkMode(); // Mode icon
  };

  return (
    <nav className="relative z-9999">
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Shbhm</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <a href={`#${name.toLowerCase()}`}>{name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id} onClick={() => handleIconClick(id)}>
              <img src={img} alt={`icon-${id}`} className="icon-hover" />
            </li>
          ))}
        </ul>

        <time 
          className="cursor-pointer hover:bg-black/5 px-2 py-1 rounded transition-colors"
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        >
          {dayjs().format("hh:mm A")} &#8226; {dayjs().format("DD MMM YYYY")}
        </time>
        
        {isCalendarOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsCalendarOpen(false)} />
            <CalendarWidget />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
