/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
// FontAwsome Icons
import {
  faShoppingCart,
  faChevronRight,
  faChevronLeft,
  faTimes,
  faUser,
  faUserPlus,
  faHome,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import * as ProfileActions from '../../../redux/actions/ProfileAction'

interface Props {
  language: string
  childrenCats: Array<any>
  categories: Array<any>
  statue: boolean
  action: () => void
  changeLanguage: (e: any) => void
  setOpen: any
  token: string
}

interface State {
  categoriesRecives: Array<any>
  toggleSub: boolean
}

class Aside extends React.Component<Props, State> {
  constructor (props) {
    super(props)

    this.state = {
      categoriesRecives: [],
      toggleSub: false,
    }
  }

  handleSubSlide = (e, category) => {
    e.preventDefault()
    const dropDownChildren = this.props.childrenCats.filter(cat => {
      return cat.parentId == category._id
    })

    this.setState(prevState => {
      return {
        categoriesRecives: dropDownChildren,
        toggleSub: !prevState.toggleSub,
      }
    })
  }

  deleteSub = () => {
    this.setState({
      toggleSub: false,
    })
  }

  render () {
    const handlePath = e => {
      e.currentTarget.childNodes[1].click()
      this.props.action()
    }

    const handleOpenCart = () => {
      this.props.action()
      this.props.setOpen()
    }

    return (
      <div
        className='mobile-nav'
        style={{
          direction: this.props.language === 'en' ? 'ltr' : 'rtl',
          textAlign: this.props.language === 'en' ? 'left' : 'right',
          left: this.props.statue === false ? '100%' : '0%',
        }}
      >
        <div className='header-slide'>
          <div className='nav-slide'>
            <div>
              <h3>
                {this.props.language === 'en'
                  ? 'Hi, We are Webay'
                  : 'اهلا فى ويباي'}
              </h3>
            </div>
            <div onClick={this.props.action}>
              <FontAwesomeIcon icon={faTimes} size='lg' />
            </div>
          </div>

          <div className='buttons-group'>
            <div onClick={e => handlePath(e)}>
              <span>
                <FontAwesomeIcon icon={faHome} size='3x' />
              </span>
              <Link href='/'>
                <a>{this.props.language === 'en' ? 'Home' : 'الرئيسية'}</a>
              </Link>
            </div>

            {this.props.token ? null : (
              <>
                <div>
                  <span>
                    <FontAwesomeIcon icon={faUserPlus} size='3x' />
                  </span>
                  <Link href='/register'>
                    <a>{this.props.language === 'en' ? 'Sign up' : 'اشترك'}</a>
                  </Link>
                </div>
                <div onClick={e => handlePath(e)}>
                  <span>
                    <FontAwesomeIcon icon={faUser} size='3x' />
                  </span>
                  <Link href='/login'>
                    <a>
                      {this.props.language === 'en' ? 'Log in' : 'تسجيل الدخول'}
                    </a>
                  </Link>
                </div>
              </>
            )}

            <div onClick={() => handleOpenCart()}>
              <span>
                <FontAwesomeIcon icon={faShoppingCart} size='3x' />
              </span>
              {this.props.language === 'en' ? 'Cart' : 'عربه التسوق'}
            </div>
          </div>
        </div>
        <div className='center-slide'>
          <div className='center-primary'>
            {this.props.language === 'en' ? (
              <p
                style={{
                  display: this.state.toggleSub === true ? 'none' : 'block',
                }}
              >
                All CATEGORIES
              </p>
            ) : (
              <p
                style={{
                  display: this.state.toggleSub === true ? 'none' : 'block',
                }}
              >
                كل الفئات
              </p>
            )}
            <ul>
              {this.props.categories.map(cata => {
                return (
                  <li
                    key={cata._id}
                    style={{
                      display: this.state.toggleSub === true ? 'none' : 'block',
                    }}
                  >
                    <a onClick={e => this.handleSubSlide(e, cata)}>
                      {this.props.language === 'en'
                        ? cata.name.en
                        : cata.name.ar}
                      {this.props.language === 'en' ? (
                        <FontAwesomeIcon icon={faChevronRight} size='xs' />
                      ) : (
                        <FontAwesomeIcon icon={faChevronLeft} size='xs' />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='center-sub'>
            {this.props.language === 'en' ? (
              <p
                onClick={this.deleteSub}
                style={{
                  display: this.state.toggleSub === false ? 'none' : 'block',
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} size='xs' />
                Back to Main Menu
              </p>
            ) : (
              <p
                onClick={this.deleteSub}
                style={{
                  display: this.state.toggleSub === false ? 'none' : 'block',
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} size='xs' />
                الرجوع إلي القائمة الرئيسية
              </p>
            )}
            <ul
              style={{
                display: this.state.toggleSub === false ? 'none' : 'block',
              }}
            >
              {this.state.categoriesRecives.map(cat => {
                return (
                  <li key={cat._id}>
                    <Link href={`/search?cat=${cat._id}`} key={cat._id}>
                      <a onClick={this.props.action}>
                        <p>
                          {this.props.language == 'ar'
                            ? cat.name.ar
                            : cat.name.en}
                        </p>
                        {this.props.language === 'en' ? (
                          <FontAwesomeIcon icon={faChevronRight} size='xs' />
                        ) : (
                          <FontAwesomeIcon icon={faChevronLeft} size='xs' />
                        )}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div
          className='center-footer'
          style={{ right: this.props.statue === false ? '-100%' : '0px' }}
        >
          <div>
            <a onClick={this.props.changeLanguage}>
              {this.props.language === 'en' ? (
                <>
                  <span>Language</span> <span>العربيه</span>
                </>
              ) : (
                <>
                  <span>اللغة</span> <span>English</span>
                </>
              )}
            </a>
          </div>
          <div>
            <a>
              <FontAwesomeIcon icon={faPhoneAlt} size='xs' />
              {this.props.language == 'ar' ? 'تواصل معنا' : 'Contact'}
            </a>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    language: state.user.language,
    childrenCats: state.product.children,
    token: state.user.user,
  }
}
const mapDispatchToProps = {
  setOpen: ProfileActions.openFloatCartNavbar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside)
