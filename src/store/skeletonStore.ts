import { create } from "zustand";

interface SkeletonState {
  isChatLoading: boolean;
  setIsChatLoading: (value: boolean) => void;
}

const useSkeletonStore = create<SkeletonState>((set) => ({
  isChatLoading: false,
  setIsChatLoading: async (value) => set({ isChatLoading: value }),
}));

export default useSkeletonStore;
