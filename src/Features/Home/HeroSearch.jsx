import { Search } from "lucide-react";
import { useState } from "react";

function HeroSearch() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-lg">
      <input
        type="text"
        placeholder="Search destinations, temples, beaches..."
        className="grow px-5 py-3 text-gray-800 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="flex cursor-pointer items-center gap-2 bg-orange-500 px-6 font-semibold text-white hover:bg-orange-600">
        <Search strokeWidth={2} size={15} /> <span>Search</span>
      </button>
    </div>
  );
}

export default HeroSearch;
