import * as types from "../types";
import axios from "axios";
import { url, cartMessageCodes } from "../../config/constants";

export const addToCart = (product, productType, pieceIndex, cost) => {
  return async (dispatch, getState) => {
    dispatch({
      type: types.ADD_TO_DELAYED,
      payload: {
        showButton: 0,
        messages: { messageCode: null, messageType: null },
      },
    });

    const { user } = getState();
    try {
      const response = await axios.post(
        `${url}/app/cart`,
        {
          product,
          productType,
          pieceIndex,
          cost,
        },
        {
          headers: {
            Authorization: `Bearer ${user.user}`,
          },
        },
      );
      if (response.status === 201) {
        dispatch({
          type: types.ADD_TO_DELAYED,
          payload: {
            showButton: 1,
            messages: {
              messageCode: cartMessageCodes.addedToCart,
              messageType: "success",
            },
          },
        });
        await dispatch(getUserCart());
        dispatch({ type: "OPEN_CART_WINDOW", payload: true });
        setTimeout(() => {
          dispatch({
            type: types.ADD_TO_DELAYED,
            payload: {
              showButton: 1,
              messages: { messageCode: null, messageType: null },
            },
          });
        }, 3000);
      }
    } catch (error) {
      dispatch({
        type: types.ADD_TO_DELAYED,
        payload: {
          showButton: 1,
          messages: {
            messageCode: cartMessageCodes.unknownError,
            messageType: "danger",
          },
        },
      });
      setTimeout(() => {
        dispatch({
          type: types.ADD_TO_DELAYED,
          payload: {
            showButton: 1,
            messages: { messageCode: null, messageType: null },
          },
        });
      }, 3000);
    }
  };
};
export const addToDelayed = (product, pieceIndex) => {
  return async (dispatch, getState) => {
    dispatch({
      type: types.ADD_TO_DELAYED,
      payload: {
        showButton: 0,
        messages: { messageCode: null, messageType: null },
      },
    });
    const { user } = getState();
    try {
      const response = await axios.post(
        `${url}/app/delayed-order`,
        {
          product,
          pieceIndex,
        },
        {
          headers: {
            Authorization: `Bearer ${user.user}`,
          },
        },
      );
      if (response.status === 201) {
        dispatch({
          type: types.ADD_TO_DELAYED,
          payload: {
            showButton: 1,
            messages: {
              messageCode: cartMessageCodes.addedToDelayed,
              messageType: "success",
            },
          },
        });
        setTimeout(() => {
          dispatch({
            type: types.ADD_TO_DELAYED,
            payload: {
              showButton: 1,
              messages: { messageCode: null, messageType: null },
            },
          });
        }, 3000);
      }
    } catch (err) {
      dispatch({
        type: types.ADD_TO_DELAYED,
        payload: {
          showButton: 1,
          messages: {
            messageCode: cartMessageCodes.unknownError,
            messageType: "danger",
          },
        },
      });
    }
  };
};
/**
 * Get user delayed orders
 */
export const getUserDelayed = () => {
  return async (dispatch, getState) => {
    const { user } = getState();
    try {
      const response = await axios.get(`${url}/app/delayed-order`, {
        headers: {
          Authorization: `Bearer ${user.user}`,
        },
      });
      if (response.status === 203) {
        dispatch({
          type: types.GET_DELAYED_ORDERS,
          payload: { delayedOrders: response.data.delayedOrders },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
/**
 * Get User cart items
 */
export const getUserCart = () => {
  return async (dispatch, getState) => {
    const { user } = getState();
    try {
      const response = await axios.get(`${url}/app/cart`, {
        headers: {
          Authorization: `Bearer ${user.user}`,
        },
      });
      if (response.status === 203) {
        dispatch({
          type: types.GET_CART_ITEMS,
          payload: response.data.items,
        });
      }
    } catch (err) {
      dispatch({
        type: types.GET_CART_ITEMS,
        payload: [],
      });
    }
  };
};
export const updateCartItem = (id, action) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    try {
      await dispatch({
        type: types.ADD_TO_DELAYED,
        payload: {
          showButton: 0,
          messages: { messageCode: null, messageType: null },
        },
      });
      const response = await axios.put(
        `${url}/app/cart`,
        {
          id,
          action,
        },
        {
          headers: {
            Authorization: `Bearer ${user.user}`,
          },
        },
      );
      await dispatch(getUserCart());
      if (response.status === 201) {
        await dispatch({
          type: types.ADD_TO_DELAYED,
          payload: {
            showButton: 1,
            messages: { messageCode: null, messageType: null },
          },
        });
      }
    } catch (err) {
      await dispatch({
        type: types.ADD_TO_DELAYED,
        payload: {
          showButton: 1,
          messages: { messageCode: null, messageType: null },
        },
      });
    }
  };
};
