import React, { useState } from 'react'
import translator from '../../utils/Translator'
import { connect } from 'react-redux'
import * as ProfileActions from '../../redux/actions/ProfileAction'

const ButtonOrder = ({
  isOrder,
  handleOrder,
  startOrder,
  orderingIsLoading,
  ordersError,
  language
}) => {
  return (
    <div
      style={{
        direction: language === 'ar' ? 'rtl' : 'ltr',
        textAlign: language === 'ar' ? 'right' : 'left',
      }}
    >
      {ordersError != null ? (
        <div className='order-errors'>
          <p>{ordersError}</p>
        </div>
      ) : null}
      {!isOrder ? (
        <button className='buy-btn' onClick={() => handleOrder()}>
          استكمال
        </button>
      ) : (
        <button
          className='buy-btn'
          onClick={() => startOrder()}
          disabled={orderingIsLoading ? true : false}
        >
          دفع
        </button>
      )}
    </div>
  )
}
const mapStateToProps = state => {
  return {
    isOrder: state.profile.isOrder,
    orderingIsLoading: state.profile.orderingIsLoading,
    ordersError: state.profile.ordersError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleOrder: () => dispatch(ProfileActions.handleOrder()),
    startOrder: () => dispatch(ProfileActions.startOrder()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonOrder)
