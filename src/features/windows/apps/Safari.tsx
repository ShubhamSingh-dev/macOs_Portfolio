import { Search, ArrowLeft, ArrowRight, RotateCw } from "lucide-react";
import WindowFrame from "../WindowFrame";

const Safari = () => {
  return (
    <WindowFrame id="safari" title="Safari" defaultWidth={900} defaultHeight={600}>
      <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e]">
        {/* Toolbar */}
        <div className="flex items-center gap-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400" title="Back" aria-label="Back">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400" title="Forward" aria-label="Forward">
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400" title="Reload" aria-label="Reload">
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex items-center gap-2 bg-gray-200 dark:bg-gray-700 rounded-lg px-3 py-1.5 mx-4 max-w-2xl">
            <Search className="w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              defaultValue="https://shubham-singh.com"
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 dark:text-gray-200"
              title="Address Bar"
              aria-label="Address Bar"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-pink-600 mb-8">Latest Articles</h2>
            
            {/* Example Blog Post */}
            <article className="grid grid-cols-12 gap-6 mb-8 group cursor-pointer">
              <div className="col-span-4 aspect-video rounded-lg overflow-hidden bg-gray-200">
                 <img src="/images/blog-1.jpg" alt="Blog" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="col-span-8 space-y-2">
                <span className="text-xs font-medium text-gray-500">November 28, 2025</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  Building a macOS Portfolio with React and Tailwind
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  Learn how to create a realistic macOS desktop experience using modern web technologies.
                </p>
                <div className="flex items-center gap-2 text-blue-600 text-xs font-medium">
                  Read more <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default Safari;
