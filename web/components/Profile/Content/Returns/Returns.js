import React, { useEffect, useState } from 'react'
import { Tab, Tabs, Button, Form } from 'react-bootstrap'
import ReturnsRequest from './ReturnsRequest'
import AcceptedRequests from './AcceptedRequests'
import * as ProfileActions from '../../../../redux/actions/ProfileAction'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import { url } from '../../../../config/constants'

const Returns = ({
  callReturns,
  requests,
  accepted,
  orders,
  makeReturn,
  language,
  saveOrderDelivered,
  orderDelivered,
}) => {
  const [isWindow, setIsWindow] = useState(false)
  const [textArea, setTextArea] = useState('')
  const [handleOptions, setHandleOptions] = useState('')

  useEffect(() => {
    callReturns()
    getOrdersDelivered()
  }, [])

  const openReturnWindow = state => {
    setIsWindow(state)
  }

  const getOrdersDelivered = async () => {
    try {
      const response = await Axios.get(`${url}/app/order-delivered`)
      saveOrderDelivered(response.data.orders)
      console.log()
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSelectOrders = e => {
    const options = e.target.options

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected && options[i].value != 'nothing') {
        setHandleOptions(options[i].value)
      }
    }
  }

  const handleTextArea = e => {
    const text = e.currentTarget.value
    setTextArea(text)
  }

  return (
    <div className='returns'>
      {isWindow ? (
        <div>
          <h6
            onClick={() => openReturnWindow(false)}
            style={{
              direction: language == 'en' ? 'right' : 'left',
              textAlign: language == 'en' ? 'right' : 'left',
            }}
          >
            {language == 'en' ? 'Back' : 'عودة'}
            <FontAwesomeIcon icon={faArrowLeft} />
          </h6>
          <div
            style={{
              display: orderDelivered.length == 0 ? 'none' : null,
            }}
          >
            <Form.Group controlId='exampleForm.ControlSelect1'>
              <Form.Label>
                {language == 'en'
                  ? 'Please choose the order you want to return'
                  : 'من فضلك اختر الطلب الذي تريد استرجاعه '}
              </Form.Label>
              <Form.Control as='select' onChange={e => handleSelectOrders(e)}>
                <option value='nothing'>
                  {language == 'en' ? 'Choose' : 'اختر'}
                </option>
                {orderDelivered.map(items => {
                  if (items) {
                    return (
                      <option key={items._id} value={items._id}>
                        {items.items[0].product.title[language]}..
                      </option>
                    )
                  }
                })}
              </Form.Control>
            </Form.Group>
            <div>
              <Form.Group controlId='exampleForm.ControlTextarea1'>
                <Form.Label>
                  {language == 'en'
                    ? 'Details of the recovery status'
                    : 'تفاصيل عن حالة الاسترجاع '}
                </Form.Label>
                <Form.Control
                  as='textarea'
                  rows='3'
                  onChange={e => handleTextArea(e)}
                />
              </Form.Group>
              <Button
                variant='success'
                onClick={() => makeReturn(textArea, handleOptions)}
              >
                {language == 'en'
                  ? 'Submission of the application'
                  : 'تقديم الطلب'}
              </Button>
            </div>
          </div>
          <div
            style={{
              textAlign: 'center',
              display: orderDelivered.length != 0 ? 'none' : null,
            }}
          >
            <h4>
              {language == 'en'
                ? 'There are no refundable products'
                : 'لا يوجد اي منتجات قابلة للأسترجاع'}
            </h4>
          </div>
        </div>
      ) : (
        <>
          <Tabs
            defaultActiveKey='ReturnsRequest'
            transition={false}
            id='noanim-tab-example'
          >
            <Tab
              eventKey='AcceptedRequests'
              title={language == 'en' ? 'accepted List' : 'تم القبول'}
            >
              <AcceptedRequests language={language} />
            </Tab>
            <Tab
              eventKey='ReturnsRequest'
              title={language == 'en' ? 'Return Requests' : 'طلبات الارجاع'}
            >
              <ReturnsRequest language={language} />
            </Tab>
          </Tabs>
          <Button variant='primary' onClick={() => openReturnWindow(true)}>
            {language == 'en' ? 'Refund request' : 'طلب استرجاع'}
          </Button>
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    orders: state.profile.orders,
    orderDelivered: state.profile.orderDelivered,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    callReturns: () => dispatch(ProfileActions.callReturns()),
    makeReturn: (order, textArea) =>
      dispatch(ProfileActions.makeReturn(order, textArea)),
    saveOrderDelivered: data =>
      dispatch({ type: 'SAVE_ORDER_DELIVERED', payload: data }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Returns)
