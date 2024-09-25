export const calculateTotals = cartItems => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCost = subtotal < 100 && cartItems.length > 0 ? 5 : 0;

  const total = subtotal + shippingCost;

  return { subtotal, shippingCost, total };
};