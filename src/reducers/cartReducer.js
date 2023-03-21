const initalState = {
  cart: [],
};

function cartReducer(state = initalState, action) {
  const product = action.payload;

  switch (action.type) {
    case 'cart/addProduct':
      if (state.cart.some((item) => item.id === product.id)) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity + 1 }
            }

            return item
          })
        }
      }

      return {
        ...state,
        cart: [...state.cart, { ...product, quantity: 1 }]
      }

    case 'cart/removeProduct':
      if (state.cart.some((item) => item.id === product.id)) {
        return {
          ...state,
          cart:
            state.cart
              .map((item) => {
                if (item.id === product.id) {
                  return { ...item, quantity: item.quantity - 1 }
                }

                return item
              })
              .filter((item) => item.quantity > 0)
        };
      }

    case 'cart/clearCart':
      return { ...state, cart: [] };

    default:
      return state;
  }
}

export { cartReducer };
