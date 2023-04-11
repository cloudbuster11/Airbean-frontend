import { createAction } from '@reduxjs/toolkit';

const addProduct = createAction('cart/addProduct');
const removeProduct = createAction('cart/removeProduct');
const clearCart = createAction('cart/clearCart');

export { addProduct, removeProduct, clearCart };
