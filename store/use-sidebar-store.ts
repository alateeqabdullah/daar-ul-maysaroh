// @/store/use-sidebar-store.ts
import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  width: number; // Add width property
  toggle: () => void;
  setOpen: (open: boolean) => void;
  initialize: () => void;
}





export const useSidebarStore = create<SidebarStore>((set, get) => ({
  isOpen: false,
  width: 320, // Default width

  toggle: () => set((state) => ({ isOpen: !state.isOpen })),

  setOpen: (open) => set({ isOpen: open }),

  initialize: () => {
    // Only runs on client
    if (typeof window !== "undefined") {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop && !get().isOpen) {
        set({ isOpen: true });
      }
    }
  },
}
));


