function addProduct(product) {
  console.log(product);
  return {
    type: 'cart/addProduct',
    payload: product,
  };
}

function removeProduct(product) {
  return {
    type: 'cart/removeProduct',
    payload: product,
  };
}

function clearCart(product) {
  return {
    type: 'cart/clearCart',
    payload: product,
  };
}

export { addProduct, removeProduct, clearCart };
