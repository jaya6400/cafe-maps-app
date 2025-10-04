import { create } from 'zustand';
import type { Cafe } from '../types/cafe.d.ts';

interface CafeState {
  cafes: Cafe[];
  selectedCafe: Cafe | null;
  setCafes: (cafes: Cafe[]) => void;
  selectCafe: (cafe: Cafe) => void;
}

export const useCafeStore = create<CafeState>((set) => ({
  cafes: [],
  selectedCafe: null,
  setCafes: (cafes) => set({ cafes }),
  selectCafe: (cafe) => set({ selectedCafe: cafe }),
}));
