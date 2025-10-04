import MapView from './components/MapView';
import CafeList from './components/CafeList';

export default function App() {
  return (
    <div style={{ display: 'flex' }}>
      <CafeList />
      <MapView />
    </div>
  );
}
