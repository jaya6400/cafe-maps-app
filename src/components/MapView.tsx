import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { useCafeStore } from '../store/cafeStore';
import { Cafe } from '../types/cafe';

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
  iconSize: [32, 32],
});

const cafeIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/921/921071.png',
  iconSize: [28, 28],
});

function FlyToCafe({ cafe }: { cafe: Cafe | null }) {
  const map = useMap();
  useEffect(() => {
    if (cafe) {
      map.flyTo([cafe.lat, cafe.lng], 16);
    }
  }, [cafe]);
  return null;
}

export default function MapView() {
  const { cafes, selectedCafe, setCafes } = useCafeStore();
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error('Location access denied', err)
    );

    fetch('/cafes.json')
      .then((res) => res.json())
      .then((data) => setCafes(data));
  }, []);

  if (!userPosition) return <p>Fetching location...</p>;

  return (
    <MapContainer center={userPosition} zoom={15} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={userPosition} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>

      {cafes.map((cafe) => (
        <Marker key={cafe.id} position={[cafe.lat, cafe.lng]} icon={cafeIcon}>
          <Popup>{cafe.name}</Popup>
        </Marker>
      ))}

      <FlyToCafe cafe={selectedCafe} />
    </MapContainer>
  );
}
