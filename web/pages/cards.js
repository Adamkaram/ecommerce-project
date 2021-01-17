import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as ProfileActions from '../redux/actions/ProfileAction'
import * as CartActions from '../redux/actions/cartAction'
import { Tab } from 'react-bootstrap'
import { url, phoneNumber } from '../config/constants'
import Link from 'next/link'
import WhatsApp from '../components/Icons/WhatsApp'

const Cards = ({
  language,
  getChargeCards,
  cards,
  getAllResults,
  cardsResult,
  addToCart,
  constants,
  userData,
}) => {
  const [categoryItems, setCategoryItems] = useState('')

  useEffect(() => {
    getChargeCards()
  }, [])

  const getItems = id => {
    setCategoryItems(id)
    getAllResults(id)
  }

  const getWhatsContact = () => {
    const whats = constants.filter(item => {
      return item.key == 'card_whats'
    })
    return whats[0].value
  }

  return (
    <div
      className='cards'
      style={{
        direction: language === 'en' ? 'ltr' : 'rtl',
        textAlign: language === 'en' ? 'left' : 'right',
      }}
    >
      <h3>{language === 'en' ? 'Charge Cards' : 'بطاقات الشحن'}</h3>
      <div className='cards-category'>
        {cards.hasOwnProperty('data')
          ? cards.data.map(items => {
              return (
                <div
                  key={items._id}
                  onClick={() => getItems(items._id)}
                  className={categoryItems == items._id ? 'active' : null}
                >
                  <div className='container-imgs'>
                    <img
                      src={`${url}/uploads/cat-thumbs/resized/${items.image}`}
                      alt={items.name.ar}
                    />
                  </div>
                  <p>{language === 'en' ? items.name.en : items.name.ar}</p>
                </div>
              )
            })
          : null}
      </div>
      {cardsResult.length != 0 ? (
        <div className='cards-result'>
          <h3>{language === 'en' ? 'Cards' : 'البطاقات'}</h3>
          <div className='all-cards-result'>
            {cardsResult.map(items => {
              return (
                <div key={items._id}>
                  <div className='container-imgs'>
                    <img
                      src={`${url}/uploads/cat-thumbs/resized/${items.image}`}
                      alt={items.title.ar}
                    />
                  </div>
                  <p>{language === 'en' ? items.title.en : items.title.ar}</p>
                  <p>{items.price}</p>
                  {userData == null ? (
                    <button>
                      <Link href='login'>
                        <a>{language === 'en' ? 'login' : 'سجل دخول'}</a>
                      </Link>
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(items, 2, null, items.price)}
                    >
                      {language === 'en' ? 'Add To Cart' : 'إضافة للسلة'}
                    </button>
                  )}

                  <button>
                    <a
                      href={`https://wa.me/${getWhatsContact()}?text=%20مرحبا%20اريد%20شراء%20البطاقة%20${items.title[language]}`}
                      target='_blank'
                    >
                      <WhatsApp />
                      {language === 'en' ? 'whatsapp buy' : 'شراء من الواتساب'}
                    </a>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getChargeCards: () => dispatch(ProfileActions.getChargeCards()),
    getAllResults: id => dispatch(ProfileActions.getAllResults(id)),
    addToCart: (product, productType, pieceIndex, cost) =>
      dispatch(CartActions.addToCart(product, productType, pieceIndex, cost)),
  }
}

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
    language: state.user.language,
    cards: state.profile.cards,
    cardsResult: state.profile.cardsResult,
    constants: state.user.constants,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
