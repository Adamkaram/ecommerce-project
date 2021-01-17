import React, { useState } from 'react'
import { Col, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import Link from 'next/link'

const Taps = ({ data, language }) => {
  const [taps, setTaps] = useState([
    {
      en: 'user',
      ar: 'الملف الشخصي',
    },
    {
      en: 'orders',
      ar: 'الطلبات',
    },
    {
      en: 'locations',
      ar: 'العناوين',
    },

    {
      en: 'wallet',
      ar: 'رصيدي',
    },

    {
      en: 'points',
      ar: 'نقاطي',
    },
    {
      en: 'returns',
      ar: 'الطلبات العائده',
    },
    {
      en: 'delayed',
      ar: 'الطلبات المتأخره',
    },
  ])
  const [activeKey, setActiveKey] = useState('User')
  const handleTaps = e => {
    const name = e.currentTarget.name
    setActiveKey(name)
  }
  return (
    <Col lg={3} className='taps'>
      <div className='name-taps'>
        <h2>
          {language == 'en' ? 'Hello' : 'اهلاً'} <span>{data.name}</span>
        </h2>
        <button>
          <Link href='/api/logout'>
            <a>{language == 'en' ? 'Logout' : 'تسجيل خروج'}</a>
          </Link>
        </button>
      </div>
      <Nav defaultActiveKey={activeKey} variant='pills' className='flex-column'>
        {taps.map((items, index) => {
          return (
            <Nav.Item key={index}>
              <Nav.Link
                eventKey={items["en"]}
                name={items[language]}
                onClick={e => handleTaps(e)}
              >
                {items[language]}
              </Nav.Link>
            </Nav.Item>
          )
        })}
      </Nav>
    </Col>
  )
}
const mapStateToProps = state => ({
  language: state.user.language,
  data: state.user.userData,
})

export default connect(mapStateToProps)(Taps)
