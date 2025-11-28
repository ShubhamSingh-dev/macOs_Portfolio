import useSystemStore from "../store/system";
import { Moon, Sun } from "lucide-react";

const wallpapers = [
  "/images/wallpaper.jpg",
  "/images/wallpaper-2.jpg", // Assuming these exist or will exist, for now just use placeholders or same one
  "/images/wallpaper-3.jpg",
];

const SystemSettings = () => {
  const { isDarkMode, toggleDarkMode } = useSystemStore();

  const handleWallpaperChange = (src: string) => {
    document.body.style.backgroundImage = `url(${src})`;
  };

  return (
    <div className="w-full h-full bg-[#f5f5f7] dark:bg-[#1e1e1e] flex flex-col">
      <div id="window-header" className="flex items-center justify-center relative py-3 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <span className="font-semibold text-sm text-gray-700 dark:text-gray-200">System Settings</span>
      </div>

      <div className="p-6 space-y-8 overflow-y-auto flex-1">
        {/* Appearance Section */}
        <section>
          <h3 className="text-xs font-medium text-gray-400 uppercase mb-3 px-1">Appearance</h3>
          <div className="bg-white dark:bg-[#2c2c2c] rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                {isDarkMode ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-blue-600" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Adjust the appearance of the system</p>
              </div>
            </div>
            
            <button 
              onClick={toggleDarkMode}
              title="Toggle Dark Mode"
              aria-label="Toggle Dark Mode"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </section>

        {/* Wallpaper Section */}
        <section>
          <h3 className="text-xs font-medium text-gray-400 uppercase mb-3 px-1">Wallpaper</h3>
          <div className="bg-white dark:bg-[#2c2c2c] rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
             <div className="grid grid-cols-3 gap-4">
                {wallpapers.map((wp, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleWallpaperChange(wp)}
                    className="aspect-video rounded-md overflow-hidden border-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition-all relative group"
                  >
                    <img src={wp} alt={`Wallpaper ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </button>
                ))}
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SystemSettings;
