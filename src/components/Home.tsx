import clsx from "clsx";
import { locations } from "../constants";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "../store/window";
import useLocationStore from "../store/location";

const projects = locations.work?.children ?? [];
const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const handleOpenProjectFolder = (project: any) => {
    setActiveLocation(project);
    openWindow("finder");
  };
  useGSAP(() => {
    Draggable.create(".folder");
  }, []);
  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProjectFolder(project)}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
