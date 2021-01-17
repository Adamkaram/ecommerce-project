import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import * as ProfileActions from '../redux/actions/ProfileAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Loading from '../components/Loading/Loading'
import FavEmptySvg from '../components/FavEmptySvg/FavEmptySvg'

const Favorites = ({ language, favorites, handleRemoveFav, favIsLoading }) => {
  return (
    <div
      className='Favorites'
      style={{
        direction: language === 'en' ? 'ltr' : 'rtl',
        textAlign: language === 'en' ? 'left' : 'right',
      }}
    >
      <Container>
        <Row>
          <Col>
            <h3> {language == 'en' ? 'Favorites List' : 'المفضلة'}</h3>
            <hr />
            {favIsLoading == false && favorites.length == 0 ? (
              <FavEmptySvg />
            ) : null}
            {favIsLoading ? <Loading /> : null}
            <div className='container-favorites'>
              {favorites.map(items => {
                return (
                  <div className='one-favorite' key={items._id}>
                    <div className='fav-container-img'>
                      <img
                        src={`https://webaystore.com/uploads/products/resized/${items.images[0]}`}
                      />
                    </div>
                    <div className='fav-container-content'>
                      <h6>
                        {items.title[language].length > 10
                          ? items.title[language].substring(0, 50)
                          : items.title[language]}
                        ...
                      </h6>
                      <div className='fav-container-buttons'>
                        <button>
                          <Link href='/p/[id]' as={`p/${items._id}`}>
                            <a>
                              {language == 'en'
                                ? 'View Product'
                                : 'رؤية المنتج '}
                            </a>
                          </Link>
                        </button>
                        <button
                          name={items._id}
                          onClick={() => handleRemoveFav(items._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    language: state.user.language,
    favorites: state.profile.favorites,
    favIsLoading: state.profile.favIsLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleRemoveFav: id => dispatch(ProfileActions.addToFavorite(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
