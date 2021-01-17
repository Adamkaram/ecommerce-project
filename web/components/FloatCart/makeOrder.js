import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import * as ProfileAction from '../../redux/actions/ProfileAction'
import Loading from '../Loading/Loading'
import Link from 'next/link'
import { Form, Button } from 'react-bootstrap'
import CouponSvg from './svgCoupon'
import Axios from 'axios'
import { url } from '../../config/constants'

const makeOrder = ({
  getAddress,
  addresses,
  handleOrder,
  addressIsLoading,
  language,
  checkCoupon,
  couponMessage,
  removeCouponMessage,
  cartItems,
  fowrwardData,
  closeFloatCart,
  userData,
  closeErrors,
}) => {
  const [payments, setPayments] = useState([])
  const [orderData, setOrderData] = useState({
    location: '',
    copoun: '',
    paymentMethod: '',
    totalCost: '',
  })

  useEffect(() => {
    getAddress()
    getPayments()
  }, [])

  const fowrward = () => {
    fowrwardData(orderData)
  }

  fowrward()

  const getTotalPrice = () => {
    let total = 0
    cartItems.forEach((item, i) => {
      total += item.cost * item.count
    })
    return total
  }

  const getPayments = async () => {
    try {
      const response = await Axios.get(`${url}/app/payment-methods`)
      const { data } = response
      const newPayments = []
      data.map(items => {
        return newPayments.push(items._id)
      })
      setPayments(newPayments)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLocations = (event, id) => {
    const parent = event.currentTarget
    const allLocations = document.querySelectorAll('.order-locations')
    allLocations.forEach(items => {
      items.classList.remove('active')
    })
    parent.classList.add('active')
    parent.firstChild.click()
    setOrderData(prevState => ({
      ...prevState,
      location: id,
    }))
  }

  const handleCoupon = e => {
    const value = e.target.value
    setOrderData(prevState => ({
      ...prevState,
      copoun: value,
    }))
  }

  const callCheckCoupon = () => {
    checkCoupon(orderData.copoun)
  }

  const handlePaymentMethod = value => {
    setOrderData(prevState => ({
      ...prevState,
      paymentMethod: value,
    }))
  }

  const getTotal = () => {
    let total = 0
    cartItems.forEach((item, i) => {
      total += item.cost * item.count
    })
    return total
  }

  const handleCloseWindow = data => {
    closeFloatCart(data)
    const tapLocation = document.getElementById('locationsId')
  }
  return (
    <div className='make-order'>
      <div className='make-order-header' onClick={() => handleOrder()}>
        <div onClick={() => closeErrors(null)}>
          <FontAwesomeIcon icon={faArrowLeft} size='sm' />
          <p>رجوع إلي السلة</p>
        </div>
      </div>
      {addressIsLoading ? (
        <Loading />
      ) : (
        <form
          className='make-order-body'
          style={{
            direction: language === 'en' ? 'ltr' : 'rtl',
            textAlign: language === 'en' ? 'left' : 'right',
          }}
        >
          {addresses.map(items => {
            return (
              <div
                className='order-locations'
                key={items._id}
                onClick={e => handleLocations(e, items._id)}
              >
                <input type='radio' id={items._id} name='locations' />
                <div className='order-locations-header'>
                  <h6 htmlFor={items._id}>{items.city.nameAr}</h6>
                </div>
                <div className='order-locations-footer'>
                  <p>{items.street}</p>
                  <p>{items.phone}</p>
                </div>
                <p>{items.details}</p>
              </div>
            )
          })}
        </form>
      )}
      <div className='add-order'>
        <button onClick={() => handleCloseWindow(false)}>
          <Link href='/profile'>
            <a>إضافة عنوان</a>
          </Link>
        </button>
      </div>

      <hr />
      <div className='coupon'>
        <h5>
          <span>{getTotal()}</span> : التكلفة بالكامل
        </h5>
        <CouponSvg />
        <Form.Group controlId='formBasicNextText'>
          <Form.Label>كود الكوبون</Form.Label>
          <Form.Control
            size='sm'
            type='text'
            placeholder='XXXX'
            name='coupon'
            onChange={e => handleCoupon(e)}
          />
          {couponMessage.length >= 1 ? (
            <div className='error-coupon'>
              <p>{couponMessage}</p>
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => removeCouponMessage()}
              />
            </div>
          ) : null}
        </Form.Group>

        <Button variant='primary' onClick={() => callCheckCoupon()}>
          تخفيض
        </Button>
      </div>
      <hr />
      <form className='visa-cards'>
        <h5>طرق الدفع</h5>
        <div>
          <div>
            <input
              type='radio'
              name='paymentMethod'
              id='p1'
              disabled={true}
              onClick={() => handlePaymentMethod(payments[0])}
            />
            <label htmlFor='p1'>
              <img src='/images/p-1.png' />
            </label>
            <p>غير متوفر</p>
          </div>
          <div>
            <input
              type='radio'
              name='paymentMethod'
              id='p2'
              onClick={() => handlePaymentMethod(payments[1])}
            />
            <label htmlFor='p2'>
              <img src='/images/p-2.png' />
            </label>
            <p>متوفر</p>
          </div>
          <div>
            <input
              type='radio'
              name='paymentMethod'
              id='p3'
              disabled={true}
              onClick={() => handlePaymentMethod(payments[2])}
            />
            <label htmlFor='p3'>
              <img src='/images/p-3.png' />
            </label>
            <p>غير متوفر</p>
          </div>
          <div>
            <input
              type='radio'
              name='paymentMethod'
              id='p4'
              disabled={getTotalPrice() < userData.credits ? true : false}
              onClick={() => handlePaymentMethod(payments[3])}
            />
            <label htmlFor='p4'>
              <img src='/images/p-4.png' />
            </label>
            <p>
              {' '}
              {getTotalPrice() < userData.credits
                ? 'لا يوجد رصيد يكفي'
                : 'متوفر'}
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
    addresses: state.profile.addresses,
    addressIsLoading: state.profile.addressIsLoading,
    language: state.user.language,
    couponMessage: state.profile.couponMessage,
    cartItems: state.cart.cartItems,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleOrder: () => dispatch(ProfileAction.handleOrder()),
    getAddress: () => dispatch(ProfileAction.getAddress()),
    checkCoupon: code => dispatch(ProfileAction.callCheckCoupon(code)),
    removeCouponMessage: () => dispatch({ type: 'REMOVE_COUPON_MESSAGE' }),
    fowrwardData: data => dispatch(ProfileAction.fowrwardData(data)),
    closeFloatCart: data => dispatch(ProfileAction.openFloatCart(data)),
    closeErrors: data =>
      dispatch(dispatch({ type: 'DISPLAY_ERROR', payload: data })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(makeOrder)
