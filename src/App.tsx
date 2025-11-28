import { useEffect, useState } from "react";
import MenuBar from "./features/menu-bar/MenuBar";
import Dock from "./features/dock/Dock";
import Spotlight from "./features/spotlight/Spotlight";
import Finder from "./features/windows/apps/Finder";
import Safari from "./features/windows/apps/Safari";
import Terminal from "./features/windows/apps/Terminal";
import Contact from "./features/windows/apps/Contact";
import Photos from "./features/windows/apps/Photos";
import Resume from "./features/windows/apps/Resume";
import TextFile from "./features/windows/apps/TextFile";
import ImageFile from "./features/windows/apps/ImageFile";
import SystemSettings from "./features/windows/apps/SystemSettings";

// import useWindowStore from "./store/window";
import useSystemStore from "./store/system";

function App() {
  // const { windows } = useWindowStore();
  const { isDarkMode } = useSystemStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate boot up
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 mb-8">
          <svg viewBox="0 0 170 170" fill="white">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.93 7.03-10.63 13.5-17.09 19.39-4.48 4.09-9.2 6.78-14.16 8.08-4.96 1.3-10.29 1.95-15.99 1.95-5.7 0-11.03-.65-15.99-1.95-4.96-1.3-9.68-3.99-14.16-8.08-6.46-5.89-12.16-12.36-17.09-19.39-3.36-4.79-6.26-10-8.71-15.66-2.45-5.66-4.35-11.36-5.7-17.09-1.35-5.73-2.03-11.43-2.03-17.09 0-5.66.68-11.36 2.03-17.09 1.35-5.73 3.25-11.43 5.7-17.09 2.45-5.66 5.35-10.87 8.71-15.66 4.93-7.03 10.63-13.5 17.09-19.39 4.48-4.09 9.2-6.78 14.16-8.08 4.96-1.3 10.29-1.95 15.99-1.95 5.7 0 11.03.65 15.99 1.95 4.96 1.3 9.68 3.99 14.16 8.08 6.46 5.89 12.16 12.36 17.09 19.39 3.36 4.79 6.26 10 8.71 15.66 2.45 5.66 4.35 11.36 5.7 17.09 1.35 5.73 2.03 11.43 2.03 17.09 0 5.66-.68 11.36-2.03 17.09-1.35 5.73-3.25 11.43-5.7 17.09z" />
          </svg>
        </div>
        <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-[loading_2s_ease-in-out_infinite] w-full" />
        </div>
      </div>
    );
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden font-georama">
      {/* Desktop Background is handled in globals.css via html/body */}
      
      <MenuBar />
      
      {/* Desktop Area */}
      <div className="relative w-full h-full pt-8 pb-20 px-4">
        {/* Windows */}
        <Finder />
        <Safari />
        <Terminal />
        <Contact />
        <Photos />
        <Resume />
        <TextFile />
        <ImageFile />
        <SystemSettings />
      </div>

      <Spotlight />
      <Dock />
    </main>
  );
}

export default App;
