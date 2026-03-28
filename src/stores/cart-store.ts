import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/data/store-products';

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => boolean;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.sku === item.sku);
        const currentQty = existing?.quantity || 0;
        if (currentQty >= item.maxStock) return false;

        set((state) => {
          const exists = state.items.find((i) => i.sku === item.sku);
          if (exists) {
            return {
              items: state.items.map((i) =>
                i.sku === item.sku ? { ...i, quantity: Math.min(i.quantity + 1, item.maxStock) } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
        return true;
      },
      removeItem: (sku) => {
        set((state) => ({ items: state.items.filter((i) => i.sku !== sku) }));
      },
      updateQuantity: (sku, quantity) => {
        if (quantity <= 0) {
          get().removeItem(sku);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.sku === sku ? { ...i, quantity: Math.min(quantity, i.maxStock) } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'aura-cart' }
  )
);
