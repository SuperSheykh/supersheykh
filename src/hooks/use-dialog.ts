import { create } from "zustand";
import { ReactNode } from "react";

type DialogStore = {
  isOpen: boolean;
  title?: string;
  description?: string;
  content?: ReactNode;
  open: (arg: {
    title: string;
    description?: string;
    content: ReactNode;
  }) => void;
  close: () => void;
};

export const useDialog = create<DialogStore>((set) => ({
  isOpen: false,
  title: undefined,
  description: undefined,
  content: undefined,
  open: (arg) => set({ isOpen: true, ...arg }),
  close: () =>
    set({
      isOpen: false,
      title: undefined,
      description: undefined,
      content: undefined,
    }),
}));

