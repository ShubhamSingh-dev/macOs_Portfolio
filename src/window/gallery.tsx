import { Search } from "lucide-react";
import { WindowControls } from "../components";
import windowWrapper from "../hoc/windowWrapper";
import { gallery, photosLinks } from "../constants";
import clsx from "clsx";
import useWindowStore from "../store/window";

const Gallery = () => {
  const { openWindow } = useWindowStore();

  const handleImageClick = (imageData: any, event: React.MouseEvent) => {
    event.stopPropagation();

    // Create data structure similar to what imgfile expects
    const data = {
      id: imageData.id,
      name: `Image ${imageData.id}`,
      imageUrl: imageData.img,
      fileType: "img",
      kind: "file",
    };

    openWindow("imgfile", data);
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2 className="font-bold text-sm text-center flex-1 text-gray-700 dark:text-gray-300">Gallery</h2>
        <Search className="icon" />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] flex h-full">
        <div className="w-48 bg-gray-50 dark:bg-[#252525] border-r border-gray-200 dark:border-gray-700 flex flex-col p-5 space-y-3">
          <div>
            <h3 className="text-xs font-medium text-gray-400 mb-1">Photos</h3>
            <ul className="space-y-1">
              {photosLinks.map((item, index) => (
                <li
                  key={item.id}
                  className={clsx(
                    "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors",
                    index === 0 
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  )}
                >
                  <img src={item.icon} className="w-4 dark:invert" alt={item.title} />
                  <p className="text-sm font-medium truncate">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-[#1e1e1e] flex-1">
          <ul className="grid grid-cols-5 grid-rows-5 gap-2.5">
            {gallery.map((image, index) => (
              <li
                key={image.id}
                onClick={(e) => handleImageClick(image, e)}
                className={clsx(
                  "cursor-pointer hover:opacity-80 transition-opacity",
                  index === 0 && "row-start-1 row-span-3 col-start-1 col-span-3",
                  index === 1 && "row-start-1 row-span-3 col-start-4 col-span-2",
                  index === 2 && "row-start-4 row-span-2 col-start-3 col-span-3",
                  index === 3 && "row-start-4 row-span-2 col-start-1 col-span-2"
                )}
              >
                <img src={image.img} alt={`Gallery image ${image.id}`} className="size-full object-cover rounded-lg" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const GalleryWindow = windowWrapper(Gallery, "photos");

export default GalleryWindow;
