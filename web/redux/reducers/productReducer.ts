import * as types from "../types";
import { bindActionCreators } from "redux";

const initialState = {
  categories: [],
  sliders: [],
  sliders2: [],
  banners: [],
  latestProducts: [],
  under499: [],
  under999: [],
  bestSeller: [],
  bestSeller2: [],
  error: null,
  showSearch: true,
  selectedCategory: null,
  children: [],
  waitingForChildren: true,
  categoryProductsPagination: {
    products: [],
    lastPage: 1,
    totalItems: 0,
    loaded: 0,
  },
  cardsCategories: [],
  cardsOfCategory: {
    cards: [],
    loaded: 0,
  },
  productsOfCategory:false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_CATEGORIES:
      return { ...state, categories: payload };
    case types.GET_CHILDREN_ALL:
      return { ...state, children: payload };
    case types.GET_SLIDER:
      return { ...state, sliders: payload.sliders };
    case types.GET_SLIDER2:
      return { ...state, sliders2: payload.sliders };
    case types.GET_BANNERS:
      return { ...state, banners: payload.sliders };

    case types.ERROR: {
      return { ...state, error: payload };
    }
    case types.SHOW_SEARCH: {
      return { ...state, showSearch: payload };
    }
    case types.GET_LATEST_PRODUCTS: {
      return { ...state, latestProducts: payload.latestProducts };
    }
    case types.GET_UNDER_499: {
      return { ...state, under499: payload.under499 };
    }
    case types.GET_UNDER_999: {
      return { ...state, under999: payload.under999 };
    }
    case types.GET_BEST_SELLER: {
      return { ...state, bestSeller: payload.latestProducts };
    }
    case types.GET_BEST_SELLER2: {
      return { ...state, bestSeller2: payload.latestProducts };
    }
    case types.SELECT_CATEGORY: {
      return { ...state, selectedCategory: payload, waitingForChildren: true };
    }
    case types.SET_CHILDREN: {
      return { ...state, children: payload, waitingForChildren: false };
    }
    case types.GET_PRODUCTS_OF_CATEGORY: {
      return { ...state, categoryProductsPagination: payload };
    }
    case types.PAGINATE_PRODUCTS: {
      return {
        ...state,
        categoryProductsPagination: {
          products: [
            ...state.categoryProductsPagination.products,
            ...payload.products,
          ],
          lastPage: payload.lastPage,
          totalItems: payload.totalItems,
          loaded: payload.loaded,
        },
      };
    }
    case types.GET_CARDS_CATEGORIES:
      return { ...state, cardsCategories: payload.cats };

    case types.GET_CARDS_OF_CATEGORY:
      return { ...state, cardsOfCategory: payload };
    case "LOADING_PRODUCTS_OF_CATEGORY":
      return {
        ...state,
        productsOfCategory:payload
      }
    default:
      return state;
  }
};
