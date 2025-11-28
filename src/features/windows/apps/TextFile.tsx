import WindowFrame from "../WindowFrame";
import useWindowStore from "../../../store/window";

const TextFile = () => {
  const { windows } = useWindowStore();
  const data = windows["txtfile"]?.data;

  return (
    <WindowFrame id="txtfile" title={data?.name || "Text File"} defaultWidth={500} defaultHeight={400}>
      <div className="h-full bg-white dark:bg-[#1e1e1e] p-6 text-gray-800 dark:text-gray-200 font-roboto text-sm leading-relaxed overflow-y-auto whitespace-pre-wrap">
        {data?.content || "No content available."}
      </div>
    </WindowFrame>
  );
};

export default TextFile;
