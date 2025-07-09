import { create } from 'zustand';

export const useWishlistStore = create((set, get) => ({
  items: [],

  addToWishlist: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeFromWishlist: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  isInWishlist: (id) =>
    get().items.some((item) => item.id === id),

  clearWishlist: () => set({ items: [] }),
}));
