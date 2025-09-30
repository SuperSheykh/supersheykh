import { create } from "zustand";

type Store = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export const useMenuDrawer = create<Store>((set) => ({
  isOpen: false,
  toggle: () => {
    set((state) => ({ isOpen: state ? false : true }));
  },
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
