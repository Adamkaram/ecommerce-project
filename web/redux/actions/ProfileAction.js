import Axios from 'axios'
import { url } from '../../config/constants'
import { toast } from 'react-toastify'
import translator, { Language } from '../../utils/Translator'

export const changeName = newName => {
  return async (dispatch, getState) => {
    const token = getState().user.user
    try {
      const response = await Axios.put(`${url}/app/user/change-name`, {
        name: newName,
      })
      const { data } = response
      toast.success('تم تغيير الأسم بنجاح')
      window.location.pathname = '/profile'
    } catch (error) {
      toast.error('حدث خطأ')
    }
  }
}

export const changePass = newPass => {
  return async (dispatch, getState) => {
    const token = getState().user.user
    try {
      const response = await Axios.put(`${url}/app/user/change-pass`, {
        password: newPass,
      })
      toast.success('تم تغيير كلمة السر بنجاح')
    } catch (error) {
      toast.error('حدث خطأ')
      console.log(error)
    }
  }
}

export const getData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'DATA_IS_LOADING', payload: true })
      const response = await Axios.get(`${url}/app/order`)
      const { data } = response
      dispatch({ type: 'GET_DATA', payload: data })
      dispatch({ type: 'DATA_IS_LOADING', payload: false })
    } catch (error) {
      toast.error('حدث خطأ اثناء تحديث العناصر')
    }
  }
}

export const getAddress = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().user.user
      dispatch({ type: 'ADDRESS_IS_LOADING', payload: true })
      const response = await Axios.get(`${url}/app/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const nextResponse = await Axios.get(`${url}/app/cities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const { data } = response
      dispatch({
        type: 'GET_ADDRESS',
        payload: data,
        nextPayload: nextResponse.data,
      })
      dispatch({ type: 'ADDRESS_IS_LOADING', payload: false })
    } catch (error) {
      toast.error('حدث خطأ اثناء جلب العناوين')
      console.log(error)
    }
  }
}

export const addAddress = (city, street, details, phone) => {
  return async (dispatch, getState) => {
    const token = getState().user.user
    try {
      const response = await Axios.post(
        `${url}/app/address`,
        {
          city,
          street,
          details,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      toast.success('تم إضافة العنوان بنجاح')
      dispatch({ type: 'BACK_LOCATIONS' })
      dispatch(getAddress())
    } catch (err) {
      console.log(err)
      toast.error('تأكد من العنوان')
    }
  }
}

export const changeStatue = statue => {
  return dispatch => {
    dispatch({ type: 'CHANGE_LOCATION_STATUE', payload: statue })
  }
}

export const getDelayedOrder = () => {
  return async (dispatch, getState) => {
    const token = getState().user.user
    try {
      const response = await Axios.get(`${url}/app/delayed-order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const { data } = response
      dispatch({ type: 'GET_DELAYED_ORDER', payload: data.delayedOrders })
    } catch (error) {
      toast.error('حدث خطأ')
    }
  }
}

export const handleOrder = () => {
  return {
    type: 'HANDLE_ORDER_WINDOW',
  }
}

export const applyCoupon = () => {
  return async dispatch => {
    const token = getState().user.user
    try {
      this.setState({ couponLoading: true })
      const response = await Axios.post(
        `${url}/app/coupon`,
        {
          ids,
          total,
          // eslint-disable-next-line react/no-access-state-in-setstate
          code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    } catch (error) {
      console.log(error)
    }
  }
}

export const callCheckCoupon = code => {
  return async (dispatch, getState) => {
    const Language = getState().user.language
    const strings = translator(Language)
    const total = getState().cart.cartItems
    const ids = []
    total.map(items => {
      return ids.push(items._id)
    })
    try {
      const response = await Axios.post(`${url}/app/`, {
        ids,
        total,
        code,
      })
      toast.success('تم إضافة العنوان بنجاح')
    } catch (err) {
      const code = err.response.status
      if (code == 404) {
        dispatch({ type: 'COUPON_ERROR', payload: strings.couponError404 })
      } else if (code == 412) {
        dispatch({ type: 'COUPON_ERROR', payload: strings.couponError412 })
      } else if (code == 410) {
        dispatch({ type: 'COUPON_ERROR', payload: strings.couponError410 })
      } else if (code == 411) {
        dispatch({ type: 'COUPON_ERROR', payload: strings.couponError411 })
      }
    }
  }
}

export const getTotal = cartItems => {
  let total = 0
  cartItems.forEach((item, i) => {
    total += item.cost * item.count
  })
  return total
}

export const fowrwardData = data => {
  return async (dispatch, getState) => {
    dispatch({ type: 'FORWARD_DATA', payload: data })
  }
}

export const startOrder = () => {
  return async (dispatch, getState) => {
    const token = getState().user.user
    const { cartItems } = getState().cart
    const { orderData, isCoupon, discount } = getState().profile
    const totalCost = getTotal(cartItems)
    try {
      dispatch({ type: 'ORDERING_IS_LOADING', payload: true })
      const response = await Axios.post(
        `${url}/app/order`,
        {
          items: cartItems,
          shippingAddress: orderData.location,
          totalCost: totalCost,
          paymentMethod: orderData.paymentMethod,
          isCoupon: isCoupon,
          coupon: orderData.copoun,
          totalAfterCoupon: discount,
          shippingCost: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      dispatch({ type: 'DISPLAY_ERROR', data: null })
      dispatch(getUserCart())
      dispatch(getData())
      dispatch({ type: 'ORDERING_IS_LOADING', payload: false })
      toast.success('تم طلب الاوردر بنجاح')
      dispatch(openFloatCart(false))
    } catch (error) {
      const code = error.response.status
      if (code == 500) {
        dispatch({
          type: 'DISPLAY_ERROR',
          payload:
            getState().user.language == 'en'
              ? 'an error occurred, please try again'
              : 'حدث خطأ, تأكد من البيانات',
        })
      }
      dispatch({ type: 'ORDERING_IS_LOADING', payload: false })
    }
  }
}

export const getUserCart = () => {
  return async (dispatch, getState) => {
    const token = getState().user.user
    try {
      const response = await Axios.get(`${url}/app/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const { items } = response.data
      dispatch({
        type: 'GET_CART_ITEMS',
        payload: items,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const openFloatCart = data => {
  return {
    type: 'OPEN_CART_WINDOW',
    payload: data,
  }
}

export const openFloatCartNavbar = () => {
  console.log('a')
  return {
    type: 'OPEN_CART_WINDOW',
    payload: true,
  }
}
export const callFavorites = () => {
  return async (dispatch, getState) => {
    const token = getState().user.user
    try {
      const response = await Axios.get(`${url}/app/favorite`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = response.data.products
      dispatch({ type: 'SAVE_FAVORITES', payload: data })
    } catch (error) {
      console.log(error)
    }
  }
}

export const handleRemoveFav = id => {
  return async (dispatch, getState) => {
    console.log(id)
    try {
      const response = await Axios.post(`${url}/app/favorite/${id}`)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

export const addToFavorite = id => {
  return async (dispatch, getState) => {
    const token = getState().user.user
    try {
      const response = await Axios.post(
        `${url}/app/favorite/`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      dispatch({ type: 'FAST_REMOVE', payload: id })
      dispatch(callFavorites())
    } catch (error) {
      console.log(error)
    }
  }
}

export const callSearchProduct = query => {
  return async dispatch => {
    try {
      let queries = query.target.value
      const response = await Axios.get(
        `${url}/app/product/search?query=${queries}`,
      )
      const { data } = response
      dispatch({ type: 'SAVE_SEARCH_PRODUCTS', payload: data })
    } catch (err) {
      console.log(error)
    }
  }
}

export const deleteProducts = () => {
  return {
    type: 'DELETE_SEARCH_PRODUCTS',
  }
}

export const getChargeCards = () => {
  return async dispatch => {
    try {
      const response = await Axios.get(
        `${url}/app/card/category/paginate?page=1&limit=99`,
      )
      const { data } = response
      dispatch({ type: 'SAVE_CARDS', payload: data })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getAllResults = id => {
  return async dispatch => {
    try {
      const response = await Axios.get(`${url}/app/card/card/category?id=${id}`)
      const { data } = response
      dispatch({ type: 'SAVE_CARDS_RESULTS', payload: data })
    } catch (error) {
      console.log(error)
    }
  }
}

export const callReturns = () => {
  return async dispatch => {
    try {
      const response = await Axios.get(`${url}/app/returns`)
      const responseTwo = await Axios.get(`${url}/app/returns-accepted`)
      const requests = response.data
      const accepted = responseTwo.data
      dispatch({ type: 'SAVE_RETURNS', payload: { requests, accepted } })
    } catch (error) {
      console.log(error)
    }
  }
}

export const makeReturn = (reason, order) => {
  return async dispatch => {
    try {
      const response = await Axios.post(`${url}/app/returns`, {
        order,
        reason,
      })
      dispatch(callReturns())
      toast.success('تم ارسال طلب الاسترجاع بنجاح')
      window.location.pathname = "/profile"
    } catch (error) {
      toast.error('حدث خطأ ما, من فضلك تأكد من البيانات')
    }
  }
}
