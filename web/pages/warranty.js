import React from 'react'
import translator from '../utils/Translator'
import { connect } from 'react-redux'

const warranty = ({ language }) => {
  console.log(language)
  return (
    <div
      className='information-page'
      style={{
        direction: language === 'en' ? 'ltr' : 'rtl',
        textAlign: language === 'en' ? 'left' : 'right',
      }}
    >
      <h5>{translator(language).warranty}</h5>
      <p>{translator(language).warrantyExplain}</p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    language: state.user.language,
  }
}

export default connect(mapStateToProps)(warranty)
