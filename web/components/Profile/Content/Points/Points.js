import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGifts } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

const Points = ({ data, language }) => {
  return (
    <div className='points'>
      <div>
        <FontAwesomeIcon icon={faGifts} />
      </div>
      <h1>
        <span>
          {language == 'en'
            ? `you have ${data.points} Point`
            : `لديك ${data.points} نقطة`}
        </span>
      </h1>
    </div>
  )
}
const mapStateToProps = state => ({
  data: state.user.userData,
})

export default connect(mapStateToProps)(Points)
