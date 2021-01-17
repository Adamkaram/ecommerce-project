import react from 'react'
import { connect } from 'react-redux'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import { faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ShareButtons = ({ language, id }) => {
  const url = `https://wetop.com.sa/p/${id}`
  return (
    <>
      <div className='window-share'>
        <h6>{language == 'en' ? 'Share' : 'مشاركه'}</h6>
        <div>
          <FacebookShareButton url={url}>
            <FontAwesomeIcon
              size='sm'
              icon={faFacebook}
              style={{ color: '#4267B2' }}
            />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <FontAwesomeIcon
              size='sm'
              icon={faTwitter}
              style={{ color: '#1DA1F2' }}
            ></FontAwesomeIcon>
          </TwitterShareButton>
          <WhatsappShareButton url={url}>
            <FontAwesomeIcon
              icon={faWhatsapp}
              style={{ color: '#25D366' }}
            ></FontAwesomeIcon>
          </WhatsappShareButton>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    language: state.user.language,
  }
}

export default connect(mapStateToProps)(ShareButtons)
