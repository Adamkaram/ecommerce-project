import React from 'react'
import translator from '../utils/Translator'
import { connect } from 'react-redux'

const returns = ({ language }) => {
  return (
    <div
      className='information-page'
      style={{
        direction: language === 'en' ? 'ltr' : 'rtl',
        textAlign: language === 'en' ? 'left' : 'right',
      }}
    >
      <h5>{translator(language).returnsPolicy}</h5>
      <p>{translator(language).returnsPolicyExplain}</p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    language: state.user.language,
  }
}

export default connect(mapStateToProps)(returns)
