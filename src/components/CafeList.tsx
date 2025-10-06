import { useEffect, useState } from "react";
import { useCafeStore } from "../store/cafeStore";

export default function CafeList() {
  const { cafes, setCafes, setSelectedCafe } = useCafeStore();
  const [search, setSearch] = useState("");

  // Load cafes from JSON
  useEffect(() => {
    fetch("/cafes.json")
      .then((res) => res.json())
      .then((data) => setCafes(data))
      .catch((err) => console.error("Error loading cafes:", err));
  }, [setCafes]);

  const filteredCafes = cafes.filter((cafe) =>
    cafe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full p-3 bg-white rounded-md shadow-md mb-4">
      <input
        type="text"
        placeholder="Search or add a cafe..."
        className="w-full mb-3 p-2 rounded-md text-gray-800 outline-none border focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-wrap gap-2">
        {filteredCafes.map((cafe) => (
          <button
            key={cafe.id}
            onClick={() => setSelectedCafe(cafe)}
            className="px-3 py-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md shadow-md hover:scale-105 transition-transform"
          >
            {cafe.name}
          </button>
        ))}
      </div>
    </div>
  );
}