import CafeList from "./components/CafeList";
import MapView from "./components/MapView";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black p-4 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        {/* Left: CafeList */}
        <div className="md:w-1/3">
          <CafeList />
        </div>

        {/* Right: Map */}
        <div className="md:w-2/3 flex flex-col">
          <MapView />
        </div>
      </div>
    </div>
  );
}
