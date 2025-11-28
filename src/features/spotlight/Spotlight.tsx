import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import useSystemStore from "../../store/system";

// import { locations } from "../../constants";

const Spotlight = () => {
  const { isSpotlightOpen, toggleSpotlight } = useSystemStore();
  // const { openWindow } = useWindowStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSpotlightOpen) {
      inputRef.current?.focus();
    }
  }, [isSpotlightOpen]);

  // Handle Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSpotlight();
      }
      if (e.key === "Escape" && isSpotlightOpen) {
        toggleSpotlight();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpotlightOpen, toggleSpotlight]);

  if (!isSpotlightOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here if needed
    console.log("Searching for:", query);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-[20vh]" onClick={toggleSpotlight}>
      <div 
        className="w-[600px] glass rounded-xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSearch} className="flex items-center px-4 py-3 gap-3">
          <Search className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Spotlight Search"
            className="flex-1 bg-transparent border-none outline-none text-xl text-gray-800 dark:text-white placeholder:text-gray-400"
          />
        </form>
        
        {/* Search Results could go here */}
        {query && (
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-2 max-h-[400px] overflow-y-auto">
             {/* Example result */}
             <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Spotlight;
