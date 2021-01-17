/* eslint-disable no-nested-ternary */
import * as types from "../types";
import { SAVE_TOKEN } from "./../types";

const initialState = {
  user: null,
  message: "",
  messageCode: null,
  done: 1,
  userData: null,
  favorites: [],
  loginMessageCode: null,
  constants: [],
  language: "ar",
  device: "web",
};

export default (state = initialState, { type, payload }) => {
  const favorites = payload
    ? payload.userData
      ? payload.userData.favorites
        ? payload.userData.favorites
        : []
      : []
    : [];
  switch (type) {
    case types.SAVE_TOKEN:
      return {
        ...state,
        userData: payload.userData,
      };
    case types.SET_DEVICE:
      return {
        ...state,
        device: payload,
      };
    case types.LOGIN_USER:
      return {
        ...state,
        user: payload.user,
        loginMessageCode: payload.messageCode,
        done: payload.done,
        userData: payload.userData,
        favorites,
      };
    case types.SET_TOKEN:
      return {
        ...state,
        user: payload,
      };
    case types.USER_REGISTER:
      return {
        ...state,
        user: payload.user,
        messageCode: payload.messageCode,
        done: payload.done,
        userData: payload.userData,
        favorites,
      };
    case types.CHECK_USER:
      return {
        ...state,
        user: payload.user,
        userData: payload.userData,
        favorites,
      };
    case types.ADD_TO_FAVORITE:
      if (state.favorites.includes(payload)) {
        const newFavorites = state.favorites.filter(item => {
          return item != payload;
        });
        return {
          ...state,
          favorites: newFavorites,
        };
      }
      return {
        ...state,
        favorites: [...state.favorites, payload],
      };
    case types.GET_CONSTANTS:
      return {
        ...state,
        constants: payload,
      };
    case types.CHANGE_LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    default:
      return state;
  }
};
