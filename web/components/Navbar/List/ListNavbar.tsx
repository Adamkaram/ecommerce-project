/* eslint-disable react/sort-comp */
import React from 'react'
import Link from 'next/link'

// Styled-Component
import { connect } from 'react-redux'
// FontAwsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
// import Link from "next/link";
import { url } from '../../../config/constants'
import { Category } from '../../../utils/interfaces'

interface Props {
  categories: Array<Category>
  childrenCats: Array<Category>
  language: string
}

interface State {
  subReceives: Array<any>
  dropReceives: Array<any>
  hover: boolean
  nameChange: string
  selectedCategory: Category
}

class ListNavbar extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      subReceives: [],
      dropReceives: [],
      hover: false,
      nameChange: '',
      selectedCategory: this.props.categories[0],
    }
  }

  textChanger = category => {
    this.setState({
      nameChange: category.name[this.props.language],
    })
    const dropDownchildrenCats = this.props.childrenCats.filter(cat => {
      return cat.parentId === category._id
    })
    this.setState({ dropReceives: dropDownchildrenCats })
  }

  subCheck = category => {
    const dropDownchildrenCats = this.props.childrenCats.filter(cat => {
      return cat.parentId === category._id
    })
    this.setState({
      subReceives: dropDownchildrenCats,
      selectedCategory: category,
    })
  }

  isOpen = () => {
    this.setState({ hover: true })
  }

  isClosed = () => {
    this.setState({
      hover: false,
    })
  }

  render() {
    return (
      <div className='container-list'>
        <div
          className='container-list'
          style={{
            direction: this.props.language === 'en' ? 'ltr' : 'rtl',
            textAlign: this.props.language === 'en' ? 'left' : 'right',
          }}
        >
          <ul>
            <li>
              <a href='/#'>
                {this.props.language === 'en'
                  ? 'ALL CATEGORIES'
                  : 'جميع الفئات'}
              </a>
              <FontAwesomeIcon icon={faAngleDown} size='xs' />
              <div className='dropdown'>
                <div className='dropdown-header'>
                  <span>
                    <h4>
                      {this.props.language === 'en'
                        ? 'ALL CATEGORIES'
                        : 'جميع الفئات'}
                    </h4>
                    <FontAwesomeIcon icon={faAngleDown} size='xs' />
                  </span>
                  <span>
                    <p>{this.state.nameChange}</p>
                  </span>
                </div>
                <div className='dropdown-center'>
                  <span>
                    <ul>
                      {this.props.categories.map(cat => {
                        return (
                          <li key={cat._id} onMouseEnter={() => this.textChanger(cat)}>
                            {cat.name[this.props.language]}
                          </li>
                        )
                      })}
                    </ul>
                  </span>
                  <span>
                    <ul>
                      {this.state.dropReceives.map(cat => {
                        return (
                          <li key={cat._id}>
                            <Link href={`/search?cat=${cat._id}`}>
                              <a>
                                {this.props.language === 'ar'
                                  ? cat.name.ar
                                  : cat.name.en}
                              </a>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </span>
                </div>
              </div>
            </li>
            {this.props.categories.slice(0, 7).map(cata => {
              return (
                <li
                  key={cata._id}
                  onMouseMove={this.isOpen}
                  onMouseLeave={this.isClosed}
                  onMouseEnter={() => this.subCheck(cata)}
                >
                  <a>
                    {this.props.language === 'en' ? cata.name.en : cata.name.ar}
                  </a>
                </li>
              )
            })}
            <li className='privet-cards'>
              <Link href='/cards'>
                <a>
                  {this.props.language === 'en'
                    ? 'charge cards'
                    : 'بطاقات الشحن'}
                </a>
              </Link>
            </li>
            <li className='offer-link'>
              <Link href='/offers'>
                <a>                  {this.props.language === 'en'
                  ? 'offers'
                  : 'العروض'}</a>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className='list-show'
          onMouseEnter={this.isOpen}
          onMouseLeave={this.isClosed}
          style={{
            direction: this.props.language === 'en' ? 'ltr' : 'rtl',
            textAlign: this.props.language === 'en' ? 'left' : 'right',
            display: this.state.hover === false ? 'none' : 'flex',
          }}
        >
          <div>
            <h5>
              {this.props.language === 'en' ? 'CATEGORIES' : 'فئات المنتجات'}
            </h5>
            <ul>
              {this.state.subReceives.map(cat => {
                return (
                  <li key={cat._id}>
                    <Link href={`/search?cat=${cat._id}`}>
                      <a>
                        {this.props.language === 'en' ? cat.name.en : cat.name.ar}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h5>{this.props.language === 'en' ? 'Most Popular' : 'المميز'}</h5>
            <div>
              {this.state.subReceives.map(cat => {
                return (
                  <Link key={cat._id} href={`/search?cat=${cat._id}`}>
                    <img
                      className='sub-img'
                      src={`${url}/uploads/cat-thumbs/resized/${cat.image}`}
                      alt=''
                    />
                  </Link>
                )
              })}
            </div>
          </div>
          <div>
            <img
              src={`${url}/uploads/cat-thumbs/resized/${this.state.selectedCategory?.image}`}
              alt='products'
              style={{
                height: 400,
                width: 400,
              }}
            />
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
  }
}
export default connect(mapStateToProps, {})(ListNavbar)
