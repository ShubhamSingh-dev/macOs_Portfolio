import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Dock, Navbar, Welcome } from "./components";
import { Terminal, Safari, Resume, Finder, Text, Image } from "./window";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
    </main>
  );
};

export default App;
