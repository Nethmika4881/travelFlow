import { Search } from "lucide-react";
import { useState } from "react";

function HeroSearch() {
  const [search, setSearch] = useState("");
  const handleClick = (e) => {
    setSearch("");
  };

  return (
    <div className="flex min-w-xl overflow-hidden rounded-xl bg-white shadow-lg md:min-w-3xl lg:min-w-4xl">
      <input
        type="text"
        placeholder="Search destinations, temples, beaches..."
        className="grow px-5 py-4 text-lg text-gray-800 focus:outline-none md:py-6 md:text-2xl lg:py-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onChange={(e) => setSearch(e.target.value)}
        onClick={(e) => handleClick(e)}
        className="flex cursor-pointer items-center gap-2 bg-orange-500 px-6 font-semibold text-white transition-all duration-200 hover:bg-orange-600 active:bg-orange-700 md:px-10"
      >
        <Search strokeWidth={2} size={15} /> <span>Search</span>
      </button>
    </div>
  );
}

export default HeroSearch;
