import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import Loading from '../../../Loading/Loading'
import moment from 'moment'
import 'moment/locale/ar'
import OrdersSvg from './OrdersSvg'

class Orders extends Component {
  render () {
    const { language } = this.props
    moment.locale(language)
    const { orders, orderIsLoading } = this.props

    const getOrderState = state => {
      if (state == 0) {
        return language == 'ar' ? 'تحت المراجعة' : 'in review'
      } else if (state == 1) {
        return language == 'ar' ? 'تحليل الطلب' : 'processing'
      } else if (state == 2) {
        return language == 'ar' ? 'تم الطلب' : 'shipped'
      } else if (state == 3) {
        return language == 'ar' ? 'تم التسليم' : 'delivered'
      } else if (state == 4) {
        return language == 'ar' ? 'مراجعة للأرجاع' : 'review for return'
      } else if (state == 5) {
        return language == 'ar' ? 'تم الاسترجاع' : 'returned'
      } else if (state == 6) {
        return language == 'ar' ? 'رفض طلب الارجاع' : 'not returned'
      }
    }
    return (
      <div className='orders'>
        <div className='head'>
          <h3> {language == 'en' ? 'Orders' : 'الطلبيات'}</h3>
          <p>
            {language == 'en'
              ? 'Learn how to manage requests Check status of your order first.'
              : 'تعرف على كيفية إدارة طلبات تحقق من حالة طلبك أول بأول.'}
          </p>
        </div>
        <div className='body'>
          {orderIsLoading == false && orders.length == 0 ? (
            <OrdersSvg language={language} />
          ) : null}
          {orderIsLoading ? (
            <Loading />
          ) : (
            orders.map(items => {
              return (
                <div className='one-order' key={items._id}>
                  <div className='header'>
                    <h6>
                      {language == 'en' ? 'OrderID' : 'رقم تعريف الطلب'}{' '}
                      <span>#{items.id}</span>
                    </h6>
                    <p>
                      <span> {moment(items.created_at).fromNow()}</span>
                    </p>
                    <b>{getOrderState(items.status)}</b>
                  </div>
                  <div className='more-details'>
                    <div className='location-order'>
                      <h6>
                        {language == 'en' ? 'Shipping Address' : 'عنوان الشحن '}
                        {/* <button>تغيير العنوان</button> */}
                      </h6>
                      <div>
                        {/* <p>عمر عاطف عمر عاطف</p> */}
                        <p>
                          {language == 'en'
                            ? items.shippingAddress.city.nameEn
                            : items.shippingAddress.city.nameAr}
                        </p>
                        <p>{items.shippingAddress.details}</p>
                        <span>{items.shippingAddress.street}</span>
                      </div>
                      <div>
                        <p>{items.shippingAddress.phone}</p>

                        {/* <p>
                          تم التحقق <FontAwesomeIcon icon={faCheckCircle} />
                        </p> */}
                      </div>
                    </div>
                    {/* <div className="pay-way">
                      <h6>طريقة الدفع</h6>
                      <p>الدفع نقداً عند الاستلام</p>
                    </div> */}
                    <div className='order-price'>
                      <h6>
                        {language == 'en' ? 'Order summary' : 'ملخص الطلبية'}
                      </h6>
                      {/* 
                      <ul>
                        <li>المجموع الفرعي</li>
                        <li>201.15 جنيه</li>
                      </ul>
                      <ul>
                        <li>رسوم الشحن</li>
                        <li>15.00 جنيه</li>
                      </ul>
                      <ul>
                        <li>رسوم الدفع نقداً عند الاستلام</li>
                        <li>10.00 جنيه</li>
                      </ul>
                      <ul className="order-all-price">
                        <li>المجموع(تتضمن الـ VAT)</li>
                        <li>226.15 جنيه</li>
                      </ul> */}

                      <ul className='order-credit'>
                        <li> {language == 'en' ? 'price' : 'السعر'}</li>
                        <li>{items.totalCost.toFixed(2)} SR</li>
                      </ul>
                    </div>
                  </div>
                  <div className='order-products'>
                    {/* <div className="container-img">
                        <img
                          src="https://k.nooncdn.com/t_desktop-pdp-v1/v1554209253/N22915507A_1.jpg"
                          alt="product"
                        />
                      </div> */}
                    {items.items.map(product => {
                      return (
                        <div className='order-product' key={product._id}>
                          <div className='container-content'>
                            {/* <p>{product.product.title.ar}</p> */}
                            <h6>{product.product.title[language]}</h6>
                            {/* <span>البائع vezo maxx</span> */}
                          </div>
                          <div className='container-price'>
                            <h6>{product.cost.toFixed(2)} SR</h6>
                            <p>
                              {product.count}{' '}
                              {language == 'en' ? 'Product' : 'منتج'}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    language: state.user.language,
    orders: state.profile.orders,
    orderIsLoading: state.profile.orderIsLoading,
  }
}

export default connect(mapStateToProps)(Orders)
