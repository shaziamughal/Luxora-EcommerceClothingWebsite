import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.id === item.id && 
                i.size === item.size && 
                i.color === item.color &&
                i.isRental === item.isRental &&
                i.rentalDuration === item.rentalDuration
        );
        
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id && 
              i.size === item.size && 
              i.color === item.color &&
              i.isRental === item.isRental &&
              i.rentalDuration === item.rentalDuration
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          };
        }
        
        return { items: [...state.items, item] };
      }),
      
      removeItem: (itemId) => set((state) => ({
        items: state.items.filter((i) => i.id !== itemId),
      })),
      
      updateQuantity: (itemId, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);