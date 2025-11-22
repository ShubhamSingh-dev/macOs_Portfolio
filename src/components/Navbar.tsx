import { navIcons, navLinks } from "../constants";
import dayjs from "dayjs";
import useWindowStore from "../store/window";
const Navbar = () => {
  const { openWindow } = useWindowStore();

  return (
    <nav>
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
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className="icon-hover" />
            </li>
          ))}
        </ul>

        <time>
          {dayjs().format("hh:mm A")} &#8226; {dayjs().format("DD MMM YYYY")}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;
