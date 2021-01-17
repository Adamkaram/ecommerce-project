import * as types from "../types";
import axios from "axios";
import { url } from "../../config/constants";
// import console = require('console');

export const getCategories = cats => {
  return {
    type: types.GET_CATEGORIES,
    payload: [],
  };
};
export const getAllChildren = children => {
  return {
    type: types.GET_CHILDREN_ALL,
    payload: children,
  };
};
/**
 * get slider 1
 */
export const getSlider = () => {
  return async dispatch => {
    try {
      const sliders = await axios.get(`/app/slider`);
      dispatch({
        type: types.GET_SLIDER,
        payload: {
          sliders: sliders.data.slider,
        },
      });
    } catch (err) {
      dispatch({
        type: types.ERROR,
        payload: "err",
      });
    }
  };
};
/**
 * get slider 2
 */
export const getSlider2 = () => {
  return async dispatch => {
    try {
      const sliders = await axios.get(`http://localhost:3000/app/slider2`);
      dispatch({
        type: types.GET_SLIDER2,
        payload: {
          sliders: sliders.data.slider,
        },
      });
    } catch (err) {
      dispatch({
        type: types.ERROR,
        payload: "err",
      });
    }
  };
};
/**
 * get banners
 */
export const getBanners = () => {
  return async dispatch => {
    try {
      const sliders = await axios.get(`/app/banner`);
      dispatch({
        type: types.GET_BANNERS,
        payload: {
          sliders: sliders.data.slider,
        },
      });
    } catch (err) {
      dispatch({
        type: types.ERROR,
        payload: "err",
      });
    }
  };
};

export const getLatestProducts = () => {
  return async dispatch => {
    try {
      const latestProducts = await axios.get(`/app/product/latest`);
      dispatch({
        type: types.GET_LATEST_PRODUCTS,
        payload: {
          latestProducts: latestProducts.data.products,
        },
      });
    } catch (err) {
      dispatch({
        type: types.ERROR,
        payload: "err",
      });
    }
  };
};
export const getUnder499 = () => {
  return async dispatch => {
    try {
      const latestProducts = await axios.get(`/app/product/499`);
      dispatch({
        type: types.GET_UNDER_499,
        payload: {
          under499: latestProducts.data.products,
        },
      });
    } catch (err) {
      dispatch({
        type: types.ERROR,
        payload: "err",
      });
    }
  };
};
export const getUnder999 = () => {
  return async dispatch => {
    try {
      const latestProducts = await axios.get(`/app/product/999`);
      dispatch({
        type: types.GET_UNDER_999,
        payload: {
          under999: latestProducts.data.products,
        },
      });
    } catch (err) {
      dispatch({
        type: types.ERROR,
        payload: "err",
      });
    }
  };
};
export const getBestSeller = () => {
  return async dispatch => {
    try {
      const latestProducts = await axios.get(`/app/product/best-seller`);
      dispatch({
        type: types.GET_BEST_SELLER,
        payload: {
          latestProducts: latestProducts.data.products,
        },
      });
    } catch (err) {
      dispatch({
        type: types.ERROR,
        payload: "err",
      });
    }
  };
};
export const getBestSeller2 = () => {
  return async dispatch => {
    try {
      const latestProducts = await axios.get(`/app/product/best-seller2`);
      dispatch({
        type: types.GET_BEST_SELLER2,
        payload: {
          latestProducts: latestProducts.data.products,
        },
      });
    } catch (err) {
      dispatch({
        type: types.ERROR,
        payload: "err",
      });
    }
  };
};

export const selectCategory = id => {
  return async dispatch => {
    try {
      dispatch({
        type: types.SELECT_CATEGORY,
        payload: id,
      });
      const children = await axios.get(`/app/category/get-children/${id}`);
      dispatch({
        type: types.SET_CHILDREN,
        payload: children.data.children,
      });
    } catch (err) {
      dispatch({
        type: types.ERROR,
        payload: "err",
      });
    }
  };
};
export const getProductsOfCategory = (id, page, sort, offers) => {
  return async dispatch => {
    try {
      dispatch({type:"LOADING_PRODUCTS_OF_CATEGORY", payload:true})
      dispatch({
        type: types.GET_PRODUCTS_OF_CATEGORY,
        payload: {
          products: [],
          lastPage: 1,
          totalItems: 0,
          loaded: 0,
        },
      });
      const res = await axios.get(
        `/app/product/category?id=${id}&page=${page}&sort=${sort}&offer=${offers}`,
      );
      dispatch({type:"LOADING_PRODUCTS_OF_CATEGORY", payload:false})
      dispatch({
        type: types.GET_PRODUCTS_OF_CATEGORY,
        payload: {
          products: res.data.data,
          lastPage: res.data.lastPage,
          totalItems: res.data.totalItems,
          loaded: 1,
        },
      });
      
    } catch (error) {
      dispatch({
        type: types.ERROR,
        payload: "err",
      });
    }
  };
};

export const paginateProducts = (id, page, sort, offers) => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `/app/product/category?id=${id}&page=${page}&sort=${sort}&offer=${offers}`,
      );
      dispatch({
        type: types.PAGINATE_PRODUCTS,
        payload: {
          products: res.data.data,
          lastPage: res.data.lastPage,
          totalItems: res.data.totalItems,
          loaded: 1,
        },
      });
    } catch (error) {
      dispatch({
        type: types.ERROR,
        payload: "err",
      });
    }
  };
};
export const getCardsCategories = () => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `/app/card/category/paginate?page=1&limit=99`,
      );
      dispatch({
        type: types.GET_CARDS_CATEGORIES,
        payload: {
          cats: res.data.data,
        },
      });
    } catch (err) {
      if (err) {
        dispatch({
          type: types.ERROR,
          payload: "err",
        });
      }
    }
  };
};
export const getCardsOfCategory = id => {
  return async dispatch => {
    try {
      dispatch({
        type: types.GET_CARDS_OF_CATEGORY,
        payload: {
          cards: [],
          loaded: 0,
        },
      });
      const res = await axios.get(`/app/card/card/category?id=${id}`);
      dispatch({
        type: types.GET_CARDS_OF_CATEGORY,
        payload: {
          cards: res.data.cards,
          loaded: 1,
        },
      });
    } catch (error) {
      dispatch({
        type: types.ERROR,
        payload: "err",
      });
    }
  };
};

export const handleSearch = p => {
  return {
    type: types.SHOW_SEARCH,
    payload: p,
  };
};
export const addToFavorite = id => {
  return async (dispatch, getState) => {
    dispatch({
      type: types.ADD_TO_FAVORITE,
      payload: id,
    });
    try {
      const { user } = getState();
      const res = await axios.post(
        `/app/favorite/`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.user}`,
          },
        },
      );
    } catch (error) {
      //
    }
  };
};
