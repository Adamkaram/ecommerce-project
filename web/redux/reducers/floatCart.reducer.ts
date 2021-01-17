import * as types from "../types";

const initialState = {
  open: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case types.OPEN_FLOAT_CART:
      return {
        ...state,
        open: true,
      };
    case types.CLOSE_FLOAT_CART:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
};
