// store.ts
import { create } from 'zustand';

type DeleteStoreType = {
  state: boolean;
  deletingResumeIds: string[];
  startDeleting: () => void;
  addToDelete: (id: string) => void;
  removeFromDelete: (id: string) => void;
  stopDeleting: () => void;
};

export const useDeleteStore = create<DeleteStoreType>((set) => ({
  state: false,
  deletingResumeIds: [],
  startDeleting: () => set({ state: true }),
  addToDelete: (id: string) =>
    set((state) => ({ deletingResumeIds: [...state.deletingResumeIds, id] })),
  removeFromDelete: (id: string) =>
    set((state) => ({
      deletingResumeIds: state.deletingResumeIds.filter((item) => item !== id),
    })),
  stopDeleting: () => set({ state: false, deletingResumeIds: [] }),
}));
