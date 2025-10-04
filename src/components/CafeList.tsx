import { useCafeStore } from '../store/cafeStore';

export default function CafeList() {
  const { cafes, selectCafe } = useCafeStore();

  return (
    <div className="p-4 bg-white shadow-md h-screen overflow-y-auto w-64">
      <h2 className="font-bold text-lg mb-3">Nearby Cafes ☕</h2>
      {cafes.map((cafe) => (
        <button
          key={cafe.id}
          onClick={() => selectCafe(cafe)}
          className="block text-left w-full mb-2 px-2 py-1 rounded hover:bg-gray-100"
        >
          {cafe.name}
        </button>
      ))}
    </div>
  );
}
