import { create } from "zustand";

interface ModalOpenStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const useModalOpenStore = create<ModalOpenStore>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}));

export default useModalOpenStore;
