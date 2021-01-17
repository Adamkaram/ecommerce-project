import React from 'react'
import { connect } from 'react-redux'

const Wallet = ({ data, language }) => {
  return (
    <div className='wallet'>
      <div>
        <p> {language == 'en' ? 'Charge' : 'رصيدي'}</p>
        <h1>
          <span>{data ? data.credits : null} </span>
        </h1>
      </div>
      {/* <div className="add-wallet">
        <div>
          <input type="text" placeholder="ادخل رقم البضاقه" />
          <button>استخدم</button>
        </div>
      </div> */}
    </div>
  )
}
const mapStateToProps = state => ({
  data: state.user.userData,
})

export default connect(mapStateToProps)(Wallet)
