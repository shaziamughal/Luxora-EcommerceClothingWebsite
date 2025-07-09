// 


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCartStore } from './cart';
import { useWishlistStore } from './wishlist';

export const useAuthStore = create(
persist(
(set, get) => ({
user: null,
token: null,
isAuthenticated: false,
login: (user, token) => {
  set({
    user,
    token,
    isAuthenticated: true
  });
},

logout: () => {
  // Clear token from localStorage (if you store it there)
  localStorage.removeItem('luxora_token');

  // Clear related stores
  useCartStore.getState().clearCart();
  useWishlistStore.getState().clearWishlist();

  // Reset auth state
  set({
    user: null,
    token: null,
    isAuthenticated: false
  });
},

updateUser: (userData) => {
  const currentUser = get().user;
  if (currentUser) {
    set({
      user: { ...currentUser, ...userData }
    });
  }
}
}),
{
name: 'auth-storage' // key for localStorage
}
)
);