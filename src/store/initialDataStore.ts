import { ChatContent } from "@/app/(home)/hooks/useChatQuery";
import { create } from "zustand";

interface InitialDataState {
  initialData: ChatContent[];
  setInitialData: (value: ChatContent) => void;
  resetInitialData: () => void;
}

const useInitialDataStore = create<InitialDataState>((set) => ({
  initialData: [],
  setInitialData: (value) =>
    set((state) => ({
      initialData: [...state.initialData, value],
    })),
  resetInitialData: () =>
    set((state) => ({
      initialData: [],
    })),
}));

export default useInitialDataStore;
