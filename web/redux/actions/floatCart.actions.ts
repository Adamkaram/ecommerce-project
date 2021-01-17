import { OPEN_FLOAT_CART, CLOSE_FLOAT_CART } from "../types";

export const openCart = () => {
  return {
    type: OPEN_FLOAT_CART,
  };
};
export const closeCart = () => {
  return {
    type: CLOSE_FLOAT_CART,
  };
};
