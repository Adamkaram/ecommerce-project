import React from 'react'
import { connect } from 'react-redux'

const ReturnsRequest = ({ language, requests }) => {
  return (
    <div>
      {requests.length != 0 ? (
        requests.map(items => {
          return (
            <div className='order-returns' key={items._id}>
              <b>#{items.order.id}</b>
              <h6>
                {language == 'en' ? 'Total Cost' : ' المجموع الكلي '}
                :
                <span>{items.order.totalCost}</span>
              </h6>
              <p style={{ textAlign: language == 'en' ? 'right' : 'left' }}>
                {language == 'en' ? 'in review' : 'مراجعة للأرجاع'}
              </p>
            </div>
          )
        })
      ) : (
        <div className='returns-msg-nothing'>
          <h4>
            {language == 'en'
              ? 'There are no refund requests'
              : 'لا يوجد طلبات استرجاع'}
          </h4>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    language: state.user.language,
    requests: state.profile.requests,
  }
}

export default connect(mapStateToProps)(ReturnsRequest)
