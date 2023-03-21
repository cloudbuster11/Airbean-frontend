import discounts from '../assets/discounts.json';

function queryDiscount(cart, combination) {
  return combination
    .map((query) => cart.some((item) => item.id === query))
    .every((match) => match === true);
}

function discountQuantity(cart, combination) {
  const quantities = combination
    .flatMap((query) => cart.filter((item) => item.id === query))
    .map((item) => item.quantity);

  const quantity = Math.min(...quantities) % Math.max(...quantities);

  return quantity ? quantity : Math.min(...quantities);
}

function getDiscounts(cart) {
  return discounts.map((discount) => {
    const isMatch = queryDiscount(cart, discount.combination);

    if (isMatch) {
      return {
        id: `discount-${discount.id}`,
        title: discount.title,
        reduction: discount.reduction,
        quantity: discountQuantity(cart, discount.combination),
      }
    }
  }).filter((item) => item);
}

export { getDiscounts };
