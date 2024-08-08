import { create } from "zustand";

interface SessionErrorStore {
  sessionError: boolean;
  setSessionError: (value: boolean) => void;
}

const useSessionErrorStore = create<SessionErrorStore>((set) => ({
  sessionError: false,
  setSessionError: (value) => set({ sessionError: value }),
}));

export default useSessionErrorStore;
