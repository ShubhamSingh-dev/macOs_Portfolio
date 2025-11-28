import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Search } from "lucide-react";
import useSystemStore from "../store/system";
import useWindowStore from "../store/window";
import { dockApps, locations } from "../constants";

const Spotlight = () => {
  const { isSpotlightOpen, toggleSpotlight } = useSystemStore();
  const { openWindow } = useWindowStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Flatten locations for search
  const allProjects = Object.values(locations).flatMap((loc) =>
    loc.children?.map((child) => ({
      ...child,
      parentType: loc.type,
    })) || []
  );

  const filteredApps = dockApps.filter((app) =>
    app.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = allProjects.filter((project) =>
    project.name.toLowerCase().includes(query.toLowerCase())
  );

  useGSAP(() => {
    if (isSpotlightOpen) {
      gsap.fromTo(
        containerRef.current,
        { y: -50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }
      );
      inputRef.current?.focus();
    }
  }, [isSpotlightOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSpotlight();
      }
      if (e.key === "Escape" && isSpotlightOpen) {
        toggleSpotlight();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpotlightOpen, toggleSpotlight]);

  const handleSelectApp = (id: string) => {
    openWindow(id);
    toggleSpotlight();
    setQuery("");
  };

  // For projects, we might want to open Finder and navigate to it, 
  // but for now let's just open Finder as that's the parent window.
  // Or if it's a specific file, maybe we can't open it directly yet without more logic.
  // We'll just open the parent folder window (Finder) for now.
  const handleSelectProject = () => {
      // Logic to open specific project location could go here
      // For now, just open Finder
      openWindow("finder");
      toggleSpotlight();
      setQuery("");
  };

  if (!isSpotlightOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-start justify-center pt-[20vh] bg-black/20 backdrop-blur-sm" onClick={toggleSpotlight}>
      <div
        ref={containerRef}
        className="w-[600px] bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-4 border-b border-gray-200/50">
          <Search className="w-6 h-6 text-gray-500 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Spotlight Search"
            className="w-full bg-transparent text-xl outline-none text-gray-800 placeholder:text-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredApps.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 px-3 py-2">Applications</h3>
              <ul>
                {filteredApps.map((app) => (
                  <li
                    key={app.id}
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer group transition-colors"
                    onClick={() => handleSelectApp(app.id)}
                  >
                    <img src={`/images/${app.icon}`} alt={app.name} className="w-6 h-6 mr-3" />
                    <span className="text-sm font-medium">{app.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {filteredProjects.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 px-3 py-2">Files & Projects</h3>
              <ul>
                {filteredProjects.map((project: any) => (
                  <li
                    key={project.id}
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer group transition-colors"
                    onClick={() => handleSelectProject()}
                  >
                    <img src={project.icon} alt={project.name} className="w-6 h-6 mr-3 object-contain" />
                    <span className="text-sm font-medium">{project.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {filteredApps.length === 0 && filteredProjects.length === 0 && (
             <div className="p-4 text-center text-gray-500 text-sm">No results found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
