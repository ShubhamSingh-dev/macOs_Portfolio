import WindowFrame from "../WindowFrame";
import useWindowStore from "../../../store/window";

const ImageFile = () => {
  const { windows } = useWindowStore();
  const data = windows["imgfile"]?.data;

  return (
    <WindowFrame id="imgfile" title={data?.name || "Image Viewer"} defaultWidth={600} defaultHeight={500}>
      <div className="h-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        {data?.src ? (
          <img 
            src={data.src} 
            alt={data.name} 
            className="max-w-full max-h-full object-contain shadow-lg rounded-lg" 
          />
        ) : (
          <p className="text-gray-500">No image loaded</p>
        )}
      </div>
    </WindowFrame>
  );
};

export default ImageFile;
