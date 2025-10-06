import { useEffect, useRef } from "react";
import { useCafeStore } from "../store/cafeStore";
import L from "leaflet";

export default function MapView() {
  const { userLocation, setUserLocation, cafes, selectedCafe } = useCafeStore();
  const mapRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Custom icons
  const userIcon = L.icon({
    iconUrl: "/your-location-icon.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const destinationIcon = L.icon({
    iconUrl: "/destination-icon.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

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
          userMarkerRef.current = L.marker(e.latlng, { icon: userIcon })
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
      L.marker([cafe.lat, cafe.lng], { icon: destinationIcon })
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
    <div className="flex flex-col flex-1 gap-2">
      {/* Recenter button above map */}
      <div className="flex justify-end mb-1">
        <button
          onClick={recenter}
          className="bg-white p-2 rounded-full shadow hover:scale-105 transition-transform"
        >
          <img src="/recenter-icon.png" alt="Recenter" className="w-6 h-6" />
        </button>
      </div>

      {/* Map */}
      <div
        id="map"
        className="w-full h-[50vh] md:h-[60vh] rounded-lg shadow-md flex-1"
      ></div>
    </div>
  );
}
