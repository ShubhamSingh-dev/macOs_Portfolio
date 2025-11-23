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
        <h2>Gallery</h2>
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3 >Photos</h3>
            <ul>
              {photosLinks.map((item, index) => (
                <li
                  key={item.id}
                  className={clsx(index === 0 ? "active" : "not-active")}
                >
                  <img src={item.icon} className="w-4" alt={item.title} />
                  <p className="text-sm font-medium truncate">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gallery">
          <ul>
            {gallery.map((image) => (
              <li
                key={image.id}
                onClick={(e) => handleImageClick(image, e)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img src={image.img} alt={`Gallery image ${image.id}`} />
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
