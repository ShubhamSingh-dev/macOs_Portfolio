import WindowFrame from "../WindowFrame";
import useSystemStore from "../../../store/system";
import { Moon, Sun } from "lucide-react";

const SystemSettings = () => {
  const { isDarkMode, toggleDarkMode } = useSystemStore();

  return (
    <WindowFrame id="system" title="System Settings" defaultWidth={600} defaultHeight={400}>
      <div className="h-full bg-[#f5f5f7] dark:bg-[#1e1e1e] p-6 flex flex-col gap-6">
        <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#2c2c2c] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
            A
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Adrian Hajdin</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Apple ID, iCloud, Media & Purchases</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#2c2c2c] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white">Appearance</h3>
          </div>
          <div className="p-4 flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Appearance</span>
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => !isDarkMode && toggleDarkMode()}
                className={`p-2 rounded-md flex items-center gap-2 transition-all ${
                  !isDarkMode ? "bg-white shadow-sm" : "text-gray-500"
                }`}
              >
                <Sun className="w-4 h-4" />
                <span className="text-xs font-medium">Light</span>
              </button>
              <button
                onClick={() => isDarkMode && toggleDarkMode()}
                className={`p-2 rounded-md flex items-center gap-2 transition-all ${
                  isDarkMode ? "bg-gray-600 text-white shadow-sm" : "text-gray-500"
                }`}
              >
                <Moon className="w-4 h-4" />
                <span className="text-xs font-medium">Dark</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default SystemSettings;
