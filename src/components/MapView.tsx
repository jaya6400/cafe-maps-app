import { useEffect, useRef } from "react";
import { useCafeStore } from "../store/cafeStore";
import L from "leaflet";

export default function MapView() {
  const { userLocation, setUserLocation, cafes, selectedCafe } = useCafeStore();
  const mapRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const pathRef = useRef<L.Polyline | null>(null); // Reference for the path line

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

  // Initialize map
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
            .bindPopup("Your Location")
            .openPopup();
        } else {
          userMarkerRef.current.setLatLng(e.latlng);
        }

        // Redraw path if a cafe is selected
        if (selectedCafe) drawPath(e.latlng, selectedCafe);
      });

      requestAnimationFrame(() => mapRef.current?.invalidateSize());
      window.addEventListener("resize", () => requestAnimationFrame(() => mapRef.current?.invalidateSize()));
    }
  }, [setUserLocation, selectedCafe]);

  // Show cafes
  useEffect(() => {
    if (!mapRef.current) return;
    cafes.forEach((cafe) => {
      L.marker([cafe.lat, cafe.lng], { icon: destinationIcon })
        .addTo(mapRef.current!)
        .bindPopup(`<b>${cafe.name}</b>`);
    });
  }, [cafes]);

  // Selected cafe
  useEffect(() => {
    if (selectedCafe && mapRef.current) {
      mapRef.current.setView([selectedCafe.lat, selectedCafe.lng], 15, { animate: true });
      L.popup()
        .setLatLng([selectedCafe.lat, selectedCafe.lng])
        .setContent(`<b>${selectedCafe.name}</b>`)
        .openOn(mapRef.current);

      // Draw path from user location to cafe
      if (userLocation) drawPath(userLocation, selectedCafe);

      requestAnimationFrame(() => mapRef.current?.invalidateSize());
    }
  }, [selectedCafe]);

  // Draw path function
  const drawPath = (from: L.LatLngLiteral, to: L.LatLngLiteral) => {
    // Remove previous path
    if (pathRef.current) {
      pathRef.current.remove();
    }

    pathRef.current = L.polyline([from, to], {
      color: "blue",
      weight: 4,
      opacity: 0.7,
    }).addTo(mapRef.current!);
  };    

  // Recenter
  const recenter = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 15, { animate: true });
      if (userMarkerRef.current) userMarkerRef.current.openPopup();

      // Redraw path if cafe selected
      if (selectedCafe) drawPath(userLocation, selectedCafe);

      requestAnimationFrame(() => mapRef.current?.invalidateSize());
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-end mb-2">
        <button onClick={recenter} className="recenter-btn">
          <img src="/recenter-icon.png" alt="Recenter" className="w-6 h-6" />
        </button>
      </div>

      <div id="map" className="map-container"></div>
    </div>
  );
}