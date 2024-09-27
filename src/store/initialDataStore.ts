import { ChatContent } from "@/app/(home)/hooks/useChatQuery";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface InitialDataState {
  initialData: ChatContent[];
  setInitialData: (index: number, value: ChatContent) => void;
  addInitialData: (value: ChatContent) => void;
  resetInitialData: () => void;
}

const useInitialDataStore = create<InitialDataState>()(
  devtools((set) => ({
    initialData: [],
    setInitialData: (index, newValue) =>
      set((state) => {
        const newData = state.initialData.map((item, idx) =>
          idx === index ? { ...item, ...newValue } : item
        );
        return { initialData: newData };
      }),
    addInitialData: (value) =>
      set((state) => ({
        initialData: [...state.initialData, value],
      })),
    resetInitialData: () =>
      set((state) => ({
        initialData: [],
      })),
  }))
);

export default useInitialDataStore;
