const initState = {
  windowIsOpen: false,
  orders: [],
  orderIsLoading: false,
  newLocationWindow: false,
  addresses: [],
  cities: [],
  addressIsLoading: false,
  delayedOrder: [],
  couponMessage: '',
  isCoupon: false,
  discount: 0,
  orderingIsLoading: false,
  isOrder: false,
  favorites: [],
  favIsLoading: false,
  searchProducts: [],
  cards: {},
  cardsResult: [],
  requests: [],
  accepted: [],
  ordersError: null,
  orderDelivered: [],
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        orders: action.payload.orders,
      }
    case 'DATA_IS_LOADING':
      return {
        ...state,
        orderIsLoading: action.payload,
      }
    case 'CHANGE_LOCATION_STATUE':
      return {
        ...state,
        newLocationWindow: action.payload,
      }
    case 'BACK_LOCATIONS':
      return {
        ...state,
        newLocationWindow: false,
      }
    case 'GET_ADDRESS':
      return {
        ...state,
        addresses: action.payload.adds,
        cities: action.nextPayload.cities,
      }
    case 'ADDRESS_IS_LOADING':
      return {
        ...state,
        addressIsLoading: action.payload,
      }
    case 'GET_DELAYED_ORDER':
      return {
        ...state,
        delayedOrder: action.payload,
      }
    case 'HANDLE_ORDER_WINDOW':
      return {
        ...state,
        isOrder: !state.isOrder,
      }
    case 'COUPON_ERROR':
      return {
        ...state,
        couponMessage: action.payload,
      }
    case 'REMOVE_COUPON_MESSAGE':
      return {
        ...state,
        couponMessage: '',
      }
    case 'FORWARD_DATA':
      return {
        ...state,
        orderData: action.payload,
      }
    case 'ORDERING_IS_LOADING':
      return {
        ...state,
        orderingIsLoading: action.payload,
      }
    case 'OPEN_CART_WINDOW':
      return {
        ...state,
        windowIsOpen: action.payload,
        isOrder: false,
        ordersError: null,
      }
    case 'SAVE_FAVORITES':
      return { ...state, favorites: action.payload }
    case 'FAST_REMOVE':
      const newFavorite = state.favorites.filter(items => {
        return items._id != action.payload
      })
      return {
        ...state,
        favorites: newFavorite,
      }
    case 'FAV_IS_LOADING':
      return {
        ...state,
        favIsLoading: action.payload,
      }
    case 'SAVE_SEARCH_PRODUCTS':
      return {
        ...state,
        searchProducts: action.payload.data,
        searchProductData: { totalItems: action.payload.totalItems },
      }
    case 'DELETE_SEARCH_PRODUCTS':
      return {
        ...state,
        searchProducts: [],
      }
    case 'SAVE_CARDS':
      return {
        ...state,
        cards: action.payload,
      }
    case 'SAVE_CARDS_RESULTS':
      return {
        ...state,
        cardsResult: action.payload.cards,
      }
    case 'SAVE_RETURNS':
      return {
        ...state,
        requests: action.payload.requests.returns,
        accepted: action.payload.accepted.returns,
      }
    case 'DISPLAY_ERROR':
      return {
        ...state,
        ordersError: action.payload,
      }
    case 'SAVE_ORDER_DELIVERED':
      return { ...state, orderDelivered: action.payload }
  }
  return state
}
export default reducer
