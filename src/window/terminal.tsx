import { Check, Flag } from "lucide-react";
import { techStack } from "../constants";
import windowWrapper from "../hoc/windowWrapper";
import { WindowControls } from "../components";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2 className="font-bold text-sm text-center w-full text-gray-700 dark:text-gray-300">Tech Stack</h2>
      </div>

      <div className="text-sm font-roboto p-5 text-gray-800 dark:text-gray-200">
        <p>
          <span className="font-bold">@shbhm % </span>
          show tech stack
        </p>

        <div className="flex items-center ms-10 mt-7">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="py-5 my-5 border-y border-dashed border-gray-300 dark:border-gray-600 space-y-1">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <Check className="text-[#00A154] w-5" size={20} />
              <h3 className="font-semibold text-[#00A154] w-32 ms-5">{category}</h3>
              <ul className="flex items-center gap-3">
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i !== items.length - 1 && ","}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="text-[#00A154] space-y-1">
          <p className="flex items-center">
            <Check size={20} className="w-5 me-5" /> 5 of 5 stacks loaded successfully (100%)
          </p>
          <p className="text-black dark:text-gray-200 flex items-center">
            <Flag size={15} fill="currentColor" className="w-5 me-5" />
            Render time: {Math.floor(Math.random() * 100)}ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = windowWrapper(Terminal, "terminal");

export default TerminalWindow;
