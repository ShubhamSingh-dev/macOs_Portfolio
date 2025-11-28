import clsx from "clsx";
import { locations } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "../store/window";
import useLocationStore from "../store/location";
import { useState } from "react";
import ContextMenu from "./ContextMenu";

gsap.registerPlugin(Draggable);

const projects = locations.work?.children ?? [];
const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleOpenProjectFolder = (project: any) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    Draggable.create(".folder", {
      bounds: "body",
      inertia: true,
    });
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => setContextMenu(null);

  return (
    <section id="home" onContextMenu={handleContextMenu} onClick={closeContextMenu}>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder cursor-pointer", project.windowPosition)}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenProjectFolder(project);
            }}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
      {contextMenu && (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} close={closeContextMenu} />
      )}
    </section>
  );
};

export default Home;
