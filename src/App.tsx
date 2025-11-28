import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dock from "./components/Dock";
import windowWrapper from "./hoc/windowWrapper";
import {
  Finder,
  Contact,
  Resume,
  Safari,
  Gallery as Photos,
  Terminal,
  Text as TxtFile,
  Image as ImgFile,
} from "./window";
import Spotlight from "./components/Spotlight";
import SystemSettings from "./components/SystemSettings";
import useSystemStore from "./store/system";

// Wrap components with windowWrapper
const FinderWindow = windowWrapper(Finder, "finder");
const ContactWindow = windowWrapper(Contact, "contact");
const ResumeWindow = windowWrapper(Resume, "resume");
const SafariWindow = windowWrapper(Safari, "safari");
const PhotosWindow = windowWrapper(Photos, "photos");
const TerminalWindow = windowWrapper(Terminal, "terminal");
const TxtFileWindow = windowWrapper(TxtFile, "txtfile");
const ImgFileWindow = windowWrapper(ImgFile, "imgfile");
const SystemWindow = windowWrapper(SystemSettings, "system");

const App = () => {
  const { isDarkMode } = useSystemStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <main>
      <Navbar />
      <Home />
      <Dock />

      {/* Windows */}
      <FinderWindow />
      <ContactWindow />
      <ResumeWindow />
      <SafariWindow />
      <PhotosWindow />
      <TerminalWindow />
      <TxtFileWindow />
      <ImgFileWindow />
      <SystemWindow />

      {/* Overlays */}
      <Spotlight />
    </main>
  );
};

export default App;
