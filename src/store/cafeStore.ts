import { create } from "zustand";
import type { Cafe } from "../types/cafe.d";

interface CafeState {
  cafes: Cafe[];
  userLocation: { lat: number; lng: number } | null;
  selectedCafe: Cafe | null;
  setCafes: (cafes: Cafe[]) => void;
  setUserLocation: (lat: number, lng: number) => void;
  setSelectedCafe: (cafe: Cafe | null) => void;
}

export const useCafeStore = create<CafeState>((set) => ({
  cafes: [],
  userLocation: null,
  selectedCafe: null,
  setCafes: (cafes) => set({ cafes }),
  setUserLocation: (lat, lng) => set({ userLocation: { lat, lng } }),
  setSelectedCafe: (cafe) => set({ selectedCafe: cafe }),
}));