import { create } from 'zustand';

interface PlatformStore {
  selectedPlatforms: string[];
  setSelectedPlatforms: (platforms: string[]) => void;
}

export const usePlatformStore = create<PlatformStore>((set) => ({
  selectedPlatforms: [],
  setSelectedPlatforms: (platforms) => set({ selectedPlatforms: platforms }),
}));