import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingCart,
  faUser,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import translator, { Language } from '../../../utils/Translator'
import { connect } from 'react-redux'
import LoginUser from './LoginUser'
import * as ProfileActions from '../../../redux/actions/ProfileAction'
import { url } from '../../../config/constants'

interface Props {
  language: Language
  token: string
  searchProducts: any
  callSearchProduct: any
  deleteProducts: any
}

const SecNavbar: React.FC<Props> = ({
  language,
  token,
  searchProducts,
  deleteProducts,
  callSearchProduct,
}) => {
  const strings = translator(language)
  const handleSearch = async e => {
    var regex = new RegExp("^[a-zA-Z0-9_.-]*$")
    if (regex.test(e.target.value)) {
      if (e.target.value.length === 0) {
        await deleteProducts()
      } else {
        await callSearchProduct(e)
      }
    } else {
      console.log("its not")
    }
  }
  return (
    <div
      className='nav'
      style={{
        direction: language === 'en' ? 'rtl' : 'ltr',
      }}
    >
      <div className='cartsAndLogIn'>
        {token ? (
          <LoginUser />
        ) : (
            <span>
              <FontAwesomeIcon icon={faUser} size='lg' />
              <Link href='/login'>
                <a>{strings.signInOrRegister}</a>
              </Link>
            </span>
          )}
      </div>
      <div
        className='SearchBoxAndLogo'
        style={{
          direction: language === 'en' ? 'ltr' : 'rtl',
          textAlign: language === 'en' ? 'left' : 'right',
        }}
      >
        <Link href='/'>
          <a>
            <img
              src='/images/logo.png'
              alt=''
              style={{
                height: 50,
              }}
            />
          </a>
        </Link>
        <div
          style={{
            display: 'flex',
            flex: 1,
          }}
        >
          <span
            style={{
              width: '100%',
            }}
          >
            <input
              type='text'
              style={{
                width: '100%',
              }}
              placeholder={
                language === 'en'
                  ? 'What are you looking for ?'
                  : 'ما الذى تبحث عنه ؟'
              }
              onChange={e => handleSearch(e)}
            />
            <FontAwesomeIcon icon={faSearch} />
          </span>
          {searchProducts.length === 0 ? null : (
            <div className='web-search-result'>
              <FontAwesomeIcon icon={faTimes} onClick={() => deleteProducts()} />
              {searchProducts.map(items => {
                return (
                  <div key={items._id}>
                    <div className='web-search-img'>
                      <img src={`${url}/uploads/products/resized/${items.images[0]}`} />
                    </div>
                    <Link href={`/p/${items._id}`}>
                      <a>{items.title.ar}</a>
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.user,
    searchProducts: state.profile.searchProducts,
  }
}

const mapDispatchToProps = {
  callSearchProduct: ProfileActions.callSearchProduct,
  deleteProducts: ProfileActions.deleteProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(SecNavbar)
