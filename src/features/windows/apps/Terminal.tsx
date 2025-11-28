import WindowFrame from "../WindowFrame";
import { Check } from "lucide-react";

const Terminal = () => {
  const techStack = [
    { name: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Zustand"] },
    { name: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Prisma"] },
    { name: "Tools", items: ["Git", "Docker", "VS Code", "Figma"] },
  ];

  return (
    <WindowFrame id="terminal" title="Terminal — -zsh — 80x24" defaultWidth={600} defaultHeight={400}>
      <div className="h-full bg-[#1e1e1e] text-white p-4 font-roboto text-sm overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-green-400">
            <span>➜</span>
            <span className="text-blue-400">~</span>
            <span>neofetch</span>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 flex items-start justify-center pt-4">
              <div className="text-blue-500 text-6xl select-none"></div>
            </div>
            
            <div className="col-span-8 space-y-2">
              <div className="flex gap-2">
                <span className="text-green-400 font-bold">shubham@macbook-pro</span>
              </div>
              <div className="border-b border-gray-600 w-full my-2" />
              
              <div className="grid grid-cols-3 gap-y-1">
                <span className="text-green-400 font-bold">OS</span>
                <span className="col-span-2">macOS Sonoma 14.0</span>
                
                <span className="text-green-400 font-bold">Host</span>
                <span className="col-span-2">MacBook Pro 16"</span>
                
                <span className="text-green-400 font-bold">Kernel</span>
                <span className="col-span-2">23.0.0</span>
                
                <span className="text-green-400 font-bold">Uptime</span>
                <span className="col-span-2">24 days, 3 hours</span>
                
                <span className="text-green-400 font-bold">Shell</span>
                <span className="col-span-2">zsh 5.9</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
             <div className="flex items-center gap-2 text-green-400 mb-4">
              <span>➜</span>
              <span className="text-blue-400">~</span>
              <span>cat skills.txt</span>
            </div>

            <div className="space-y-4 pl-4 border-l-2 border-gray-700 ml-1">
              {techStack.map((category) => (
                <div key={category.name}>
                  <h3 className="text-yellow-400 font-bold mb-2">{category.name}:</h3>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((item) => (
                      <span key={item} className="flex items-center gap-1 text-gray-300">
                        <Check className="w-3 h-3 text-green-500" /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-green-400 animate-pulse">
            <span>➜</span>
            <span className="text-blue-400">~</span>
            <span className="w-2 h-4 bg-gray-500 block" />
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default Terminal;
