import * as types from "../types";
import axios from "axios";
import { url, messageCodes } from "../../config/constants";
import Cookies from "js-cookie";

// import localStorage from '@react-native-community/async-storage';
import { getUserCart } from "./cartAction";
import Router from "next/router";

export const changeLanguage = language => {
  return {
    type: types.CHANGE_LANGUAGE,
    payload: language,
  };
};

export const onLogin = (username: string, password: string) => {
  return async dispatch => {
    dispatch({
      type: types.LOGIN_USER,
      payload: {
        user: null,
        messageCode: null,
        done: 1,
        userData: null,
      },
    });
    try {
      const response = await axios({
        url: `${url}/api/user/login`,
        method: "POST",
        data: {
          username,
          password,
        },
      });

      if (response.status === 200) {
        try {
          Cookies.set("token", response.data.token);
          await dispatch({
            type: types.LOGIN_USER,
            payload: {
              user: response.data.token,
              messageCode: messageCodes.loginSuccess,
              done: 1,
              userData: response.data.userData,
            },
          });
          await dispatch(getUserCart());
          window.location.href = "/";
        } catch (error) {
          console.log(error);
        }
      } else {
        dispatch({
          type: types.LOGIN_USER,
          payload: {
            user: null,
            messageCode: messageCodes.unknownError,
            done: 1,
            userData: null,
          },
        });
      }
    } catch (error) {
      const code = error.response.status;

      switch (code) {
        case 431:
          dispatch({
            type: types.LOGIN_USER,
            payload: {
              user: null,
              messageCode: messageCodes.usernameNotFound,
              done: 1,
              userData: null,
            },
          });
          break;
        case 432:
          dispatch({
            type: types.LOGIN_USER,
            payload: {
              user: null,
              messageCode: messageCodes.incorrectPassword,
              done: 1,
              userData: null,
            },
          });
          break;
        default:
          dispatch({
            type: types.LOGIN_USER,
            payload: {
              user: null,
              messageCode: messageCodes.unknownError,
              done: 1,
              userData: null,
            },
          });
          break;
      }
    }
  };
};

export const onRegister = ({ name, username, phone, email, password }) => {
  return async dispatch => {
    dispatch({
      type: types.LOGIN_USER,
      payload: { user: null, messageCode: null, done: 1, userData: null },
    });
    try {
      const response = await axios.post(`${url}/api/user/register`, {
        name,
        username,
        phone,
        email,
        password,
      });
      if (response.status === 200) {
        Cookies.set("token", response.data.token);
        dispatch({
          type: types.LOGIN_USER,
          payload: {
            user: response.data.token,
            messageCode: messageCodes.registerSuccess,
            done: 1,
            userData: response.data.userData,
          },
        });
        await dispatch(getUserCart());
        window.location.href = "/";
      } else {
        dispatch({
          type: types.LOGIN_USER,
          payload: {
            user: null,
            messageCode: messageCodes.unknownError,
            done: 1,
            userData: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: types.LOGIN_USER,
        payload: {
          user: null,
          messageCode: messageCodes.emailFound,
          done: 1,
          userData: null,
        },
      });

      const code = error.response.status;
      console.log(code);
      switch (code) {
        case 423:
          dispatch({
            type: types.LOGIN_USER,
            payload: {
              user: null,
              messageCode: messageCodes.emailFound,
              done: 1,
              userData: null,
            },
          });
          break;
        case 424:
          dispatch({
            type: types.LOGIN_USER,
            payload: {
              user: null,
              messageCode: messageCodes.usernameFound,
              done: 1,
              userData: null,
            },
          });
          break;
        case 425:
          dispatch({
            type: types.LOGIN_USER,
            payload: {
              user: null,
              messageCode: messageCodes.phoneFound,
              done: 1,
              userData: null,
            },
          });
          break;
        default:
          dispatch({
            type: types.LOGIN_USER,
            payload: {
              user: null,
              messageCode: messageCodes.unknownError,
              done: 1,
              userData: null,
            },
          });
          break;
      }
    }
  };
};

export const checkIfLogin = () => {
  return async (dispatch, getState) => {
    console.log(getState());
    try {
      const user = localStorage.getItem("token") || null;
      const userData = await axios.get(`${url}/api/user/get-data`, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });

      if (userData.data.userData != null) {
        Promise.all([
          dispatch({
            type: types.CHECK_USER,
            payload: { user, userData: userData.data.userData },
          }),
          dispatch(getUserCart()),
        ]);
      } else {
        dispatch(logout());
      }
      console.log(getState());
    } catch (error) {
      if (error.response) {
        if (error.response.status === 413) {
          dispatch(logout());
        }
      }
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      await localStorage.removeItem("token");
      await dispatch({ type: types.CHECK_USER, payload: { user: null } });
      await dispatch(getUserCart());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getConstants = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${url}/app/constants`);
      return dispatch({
        type: types.GET_CONSTANTS,
        payload: res.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
