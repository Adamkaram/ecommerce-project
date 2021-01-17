import * as types from "../types";

const initialState = {
  showButton: 1,
  messages: {
    messageCode: null,
    messageType: "",
  },
  cartItems: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_TO_DELAYED:
      return {
        ...state,
        showButton: payload.showButton,
        messages: payload.messages,
      };
    case types.GET_CART_ITEMS:
      // console.log(payload);
      return {
        ...state,
        cartItems: payload,
      };
    default:
      return state;
  }
};
