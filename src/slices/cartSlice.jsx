import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addProduct(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeProduct(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);
      if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter((item) => item._id !== product._id);
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
