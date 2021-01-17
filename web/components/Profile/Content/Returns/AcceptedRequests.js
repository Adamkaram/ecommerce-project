import React from 'react'
import { connect } from 'react-redux'

const AcceptedRequests = ({ accepted, language }) => {
  return (
    <div>
      <div className='returns-msg-nothing'>
        <h4>
          {language == 'en'
            ? 'There are no approved requests'
            : 'لا يوجد طلبات موافق عليها '}
        </h4>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    accepted: state.profile.accepted,
  }
}

export default connect(mapStateToProps)(AcceptedRequests)
