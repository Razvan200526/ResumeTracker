// store.ts
import { create } from 'zustand';

type DeleteStoreType = {
  state: 'isDeleting' | 'isNotDeleting';
  deletingResumeIds: string[];
  startDeleting: (ids: string[]) => void;
  stopDeleting: () => void;
};

export const deleteStore = create<DeleteStoreType>((set) => ({
  state: 'isNotDeleting',
  deletingResumeIds: [],
  startDeleting: (ids) => set({ state: 'isDeleting', deletingResumeIds: ids }),
  stopDeleting: () => set({ state: 'isNotDeleting', deletingResumeIds: [] }),
}));
