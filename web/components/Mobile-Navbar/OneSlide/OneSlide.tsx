import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as ProfileActions from '../../../redux/actions/ProfileAction'

// FontAwsome Icons
import {
  faSearch,
  faAlignRight,
  faAlignLeft,
  faShoppingCart,
  faTimes,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { connect } from 'react-redux'
import { handleSearch } from '../../../redux/actions'

interface Props {
  language: string
  slide: boolean
  action: () => void
  token: string
  setOpen: any
  callSearchProduct: (e: string) => any
  searchProducts: any
  deleteProducts: any
  favorites: any
}

interface State {
  search: boolean
}

class OneSlide extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      search: false,
    }
  }

  searchChange = () => {
    this.setState(prevState => {
      return {
        search: true,
      }
    })
  }

  searchChangeClose = async () => {
    await this.props.deleteProducts()
    this.setState(prevState => {
      return {
        search: false,
      }
    })
  }

  render() {
    const handleSearch = async e => {
      if (e.target.value.length === 0) {
        await this.props.deleteProducts()
      } else {
        await this.props.callSearchProduct(e)
      }
    }
    return (
      <div
        className='slide'
        style={{ direction: this.props.language === 'en' ? 'ltr' : 'rtl' }}
      >
        <div>
          <div onClick={this.props.action}>
            {this.props.language === 'en' ? (
              <FontAwesomeIcon size='3x' icon={faAlignLeft} />
            ) : (
                <FontAwesomeIcon size='3x' icon={faAlignRight} />
              )}
          </div>
          <div>
            <Link href='/'>
              <img src='/images/logo.png' style={{ height: 30 }} alt='' />
            </Link>
          </div>
        </div>
        <div>
          {this.props.token ? <div>
            <Link href='/favorites'>
              <a>
                <div className='fav-button'>
                  <FontAwesomeIcon icon={faHeart} />
                  <div>
                    <p>{this.props.favorites.length}</p>
                  </div>
                </div>
              </a>
            </Link>
          </div> : null}

          <div>
            <FontAwesomeIcon
              icon={faSearch}
              size='3x'
              onClick={this.searchChange}
            />
          </div>

          {this.props.token ? <div onClick={() => this.props.setOpen()}>
            <FontAwesomeIcon
              className='searchIcon'
              icon={faShoppingCart}
              size='3x'
            />
          </div> : null}
        </div>
        <aside
          style={{
            top: this.state.search === false ? '0px' : '0',
            visibility: this.state.search === false ? 'hidden' : 'visible',
          }}
        >
          <span>
            <FontAwesomeIcon
              icon={faTimes}
              size='sm'
              style={{ right: this.props.language === 'en' ? '15px' : '93%' }}
              onClick={this.searchChangeClose}
            />
            <input
              type='text'
              placeholder={
                this.props.language === 'en'
                  ? 'What are you looking for ?'
                  : 'ما الذى تبحث عنه ؟'
              }
              style={{
                textAlign: this.props.language === 'en' ? 'left' : 'right',
              }}
              onChange={e => handleSearch(e)}
            />

            {this.props.searchProducts.length === 0 ? null : (
              <div className='search-result'>
                {this.props.searchProducts.map(items => {
                  return (
                    <div key={items._id}>
                      <Link href={`/p/${items._id}`}>
                        <a>
                          <p>{items.title.ar}</p>
                        </a>
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
          </span>
        </aside>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    language: state.user.language,
    token: state.user.user,
    searchProducts: state.profile.searchProducts,
    favorites: state.profile.favorites,
  }
}
const mapDispatchToProps = {
  setOpen: ProfileActions.openFloatCartNavbar,
  callSearchProduct: ProfileActions.callSearchProduct,
  deleteProducts: ProfileActions.deleteProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(OneSlide)
