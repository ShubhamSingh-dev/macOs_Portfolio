import { useState } from "react";
import WindowFrame from "../WindowFrame";

const Photos = () => {
  const [activeTab, setActiveTab] = useState("All Photos");

  const photos = [
    "/images/photo-1.jpg",
    "/images/photo-2.jpg",
    "/images/photo-3.jpg",
    "/images/photo-4.jpg",
    "/images/photo-5.jpg",
    "/images/photo-6.jpg",
  ];

  return (
    <WindowFrame id="photos" title="Photos" defaultWidth={800} defaultHeight={600}>
      <div className="flex h-full bg-white dark:bg-[#1e1e1e]">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50 dark:bg-[#252525] border-r border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xs font-semibold text-gray-500 mb-2 px-2">Library</h3>
          <ul className="space-y-1">
            {["All Photos", "Favorites", "Recents"].map((tab) => (
              <li
                key={tab}
                className={`px-3 py-1.5 rounded-md text-sm cursor-pointer ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 group cursor-pointer">
                <img 
                  src={photo} 
                  alt={`Photo ${i + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default Photos;
