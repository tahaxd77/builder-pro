// stores/useCartStore.js
import { create } from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCartStore = create(
    
  persist(
    (set) => ({
      // State
      items: [],

      // Actions
      addToCart: (product, quantity) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.productId === product.productId
          );
            console.log('items:', state.items);

          if (existingItem) {
           console.log("updating existingItem: ")
            return {
              items: state.items.map((item) =>
                item.product.ProductId === product.ProductId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            // Add new product to cart
            return {
              items: [...state.items, { product, quantity }],
            };
          }
        });
      },

      removeFromCart: (productId) => {
        set((state) => {
          console.log('Removing product:', productId);
          console.log('Current items:', state.items);
          
          // Fix casing to match product structure
          const updatedItems = state.items.filter(
            item => item.product.productId !== productId 
          );
          
          console.log('Updated items:', updatedItems);
          return { items: updatedItems };
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
        name: 'cart-storage',
        storage: createJSONStorage(() => AsyncStorage),
        onError: (error) => {
          console.error('Persist middleware error:', error);
        }
    }
  )
);

export default useCartStore;