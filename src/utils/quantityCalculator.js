export const quantityCalculator = (cart) => {
  return cart.reduce((accumulator, product) => {
    return accumulator + product.quantity
  }, 0)
}
