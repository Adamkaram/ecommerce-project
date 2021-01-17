import React, { ReactElement } from 'react'

// react-slick Import
import Slider from 'react-slick'
import Item from './Item'
import { Row, Col } from 'react-bootstrap'
import { Product } from '../../../utils/interfaces'
import { isAr } from '../../../utils/functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

interface Props {
  language: string
  products: Array<Product>
  mobile: boolean
  searchProducts: any
}

const BestSellerSlider = ({
  language,
  products,
  mobile,
  searchProducts,
}): ReactElement => {
  const ArrowLeft = props => {
    const { onClick } = props

    return (
      <button
        type='button'
        // {...props}
        onClick={onClick}
        className={(props.next, 'newArrowNext newArrows')}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    )
  }
  const ArrowRight = props => {
    const { onClick } = props

    return (
      <button
        type='button'
        // {...props}
        onClick={onClick}
        className={(props.next, 'newArrowPrev newArrows')}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    )
  }
  const settings = {
    rtl: isAr(language),
    dots: false,
    speed: 500,
    autoplaySpeed: 3000,
    autoplay: false,
    slidesToShow: mobile ? 1.8 : 6,
    slidesToScroll: mobile ? 1.8 : 6,
    initialSlide: 0,
    prevArrow: searchProducts.length === 0 ? <ArrowLeft /> : null,
    nextArrow: searchProducts.length === 0 ? <ArrowRight /> : null,

    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2.5,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1.8,
        },
      },
    ],
  }
  const renderItems = () => {
    return products.map(product => {
      return <Item key={product._id} product={product} language={language} />
    })
  }
  return (
    <div className='sec-slider'>
      <Row className='cata'>
        <Col>
          <Slider {...settings}>{renderItems()}</Slider>
        </Col>
      </Row>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    searchProducts: state.profile.searchProducts,
  }
}

export default connect(mapStateToProps)(BestSellerSlider)
