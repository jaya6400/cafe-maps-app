import { useEffect, useRef } from "react";
import { useCafeStore } from "../store/cafeStore";
import L from "leaflet";

export default function MapView() {
  const { userLocation, setUserLocation, cafes, selectedCafe } = useCafeStore();
  const mapRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize map and locate user
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([19.076, 72.8777], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(mapRef.current);

      mapRef.current.locate({ setView: true, maxZoom: 15 });

      mapRef.current.on("locationfound", (e: L.LocationEvent) => {
        setUserLocation(e.latlng.lat, e.latlng.lng);
        if (!userMarkerRef.current) {
          userMarkerRef.current = L.marker(e.latlng)
            .addTo(mapRef.current!)
            .bindPopup("You are here")
            .openPopup();
        } else {
          userMarkerRef.current.setLatLng(e.latlng);
        }
      });
    }
  }, [setUserLocation]);

  // Show cafes as markers
  useEffect(() => {
    if (!mapRef.current) return;
    cafes.forEach((cafe) => {
      L.marker([cafe.lat, cafe.lng])
        .addTo(mapRef.current!)
        .bindPopup(`<b>${cafe.name}</b>`);
    });
  }, [cafes]);

  // Jump to selected cafe
  useEffect(() => {
    if (selectedCafe && mapRef.current) {
      mapRef.current.setView([selectedCafe.lat, selectedCafe.lng], 15);
      L.popup()
        .setLatLng([selectedCafe.lat, selectedCafe.lng])
        .setContent(`<b>${selectedCafe.name}</b>`)
        .openOn(mapRef.current);
    }
  }, [selectedCafe]);

  // Recenter to user location
  const recenter = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 15);
    }
  };

  return (
    <div className="relative w-full h-[80vh]">
      <div id="map" className="w-full h-full rounded-lg shadow-md"></div>

      <button
        onClick={recenter}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-105 transition-transform"
      >
        📍
      </button>
    </div>
  );
}