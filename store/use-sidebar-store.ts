import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false, // Initial state is closed
  toggle: () => set((state) => ({ isOpen: !state })),
  setOpen: (open) => set({ isOpen: open }),
}));
