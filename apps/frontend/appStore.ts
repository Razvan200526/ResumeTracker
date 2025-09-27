import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AppSidebarStoreType = {
  isOpen: boolean;
  isMinimized: boolean;
  minimize: () => void;
  expand: () => void;
  open: () => void;
  close: () => void;
  onOpenChange: (open: boolean) => void;
  clear: () => void;
};
const createAppSidebarStore = () => {
  return create<AppSidebarStoreType>()(
    persist(
      (set) => ({
        isOpen: false,
        isMinimized: false,
        minimize: () => set({ isMinimized: true }),
        expand: () => set({ isMinimized: false }),
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
        onOpenChange: (open: boolean) => set({ isOpen: open }),
        clear: () => {
          set({ isOpen: false });
          sessionStorage.removeItem('app-sidebar');
        },
      }),
      {
        name: 'app-sidebar',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
};

// Store instance cache
let storeInstance: ReturnType<typeof createAppSidebarStore> | null = null;

export const useAppSidebarStore = (): AppSidebarStoreType => {
  if (!storeInstance) {
    storeInstance = createAppSidebarStore();
  }
  return storeInstance();
};
