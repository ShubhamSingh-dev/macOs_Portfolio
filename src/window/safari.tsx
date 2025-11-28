import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import { WindowControls } from "../components";
import windowWrapper from "../hoc/windowWrapper";
import { blogPosts } from "../constants";

const Safari = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />

        <PanelLeft className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />

          <div className="flex items-center gap-3 w-2/3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
            <Search className="icon" />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="placeholder:text-gray-400 bg-transparent w-full outline-none text-gray-800 dark:text-gray-200"
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 max-w-2xl mx-auto overflow-y-auto max-h-[65vh]">
        <h2 className="text-lg font-bold text-pink-600 mb-8">My Developer Blog</h2>

        <div className="space-y-8">
          {blogPosts.map(({ id, image, title, date, link }) => (
            <div key={id} className="grid grid-cols-12 space-x-4 mb-6 border rounded-md border-gray-200 dark:border-gray-700 p-2">
              <div className="col-span-2">
                <img src={image} alt={title} className="size-full rounded-md object-cover" />
              </div>
              <div className="col-span-10 space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
                <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">{title}</h3>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline flex items-center gap-3">
                  Check out the full blog <MoveRight className="icon-hover" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const SafariWindow = windowWrapper(Safari, "safari");

export default SafariWindow;
