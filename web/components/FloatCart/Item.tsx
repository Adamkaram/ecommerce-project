import React from 'react'
import { OrderCartItem } from '../../utils/interfaces'
import styles from './style'
import translator, { Language } from '../../utils/Translator'
import { url } from '../../config/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface Props {
  cartItem: OrderCartItem
  language: Language
  onChangeCount: (cartItem: string, method: string) => void
}

const Item: React.FC<Props> = ({ cartItem, language, onChangeCount }) => {
  const strings = translator(language)

  const firstRowStyle: React.CSSProperties = {
    flexDirection: 'row',
    flex: 1,
    display: 'flex',
    direction: language === 'ar' ? 'rtl' : 'ltr',
    textAlign: language === 'ar' ? 'right' : 'left',
  }

  const showItem = () => {
    if (cartItem.product_type === 1 && 'pieces' in cartItem.product) {
      return (
        <>
          <div style={firstRowStyle}>
            <div style={styles.productDetails}>
              <span style={styles.productTitle}>
                {cartItem.product.title[language]}
              </span>
              {/* {handlePiece()} */}
              <span style={styles.price}>
                {`${cartItem.cost} ${strings.currency}`} x {cartItem.count}
              </span>
            </div>
            <div style={styles.productImageContainer}>
              <img
                src={`${url}/uploads/products/resized/${
                  cartItem.product.images[cartItem.product.images.length - 1]
                }`}
                alt='product'
                style={styles.productImage}
              />
            </div>
          </div>
          <div style={styles.productFooter}>
            <div style={styles.controlCount}>
              <button
                type='button'
                style={styles.countHandlers}
                onClick={() => onChangeCount(cartItem._id, 'increase')}
              >
                <span style={styles.countText}>+</span>
              </button>
              <span style={styles.countText}>{cartItem.count}</span>
              <button
                type='button'
                style={styles.countHandlers}
                onClick={() => onChangeCount(cartItem._id, 'decrease')}
              >
                <span style={styles.countText}>-</span>
              </button>
            </div>
            <button
              type='button'
              style={styles.remove}
              onClick={() => onChangeCount(cartItem._id, 'delete')}
            >
              <FontAwesomeIcon icon={faTrash} style={styles.removeText} />
            </button>
          </div>
        </>
      )
    }
    if (cartItem.product_type === 2 && 'category' in cartItem.product) {
      return (
        <>
          <div style={firstRowStyle}>
            <div style={styles.productDetails}>
              <span style={styles.productTitle}>
                {cartItem.product.title[language]}
              </span>
              <span style={styles.attributes}>
                {cartItem.product.category.name[language]}
              </span>
              <span style={styles.price}>
                {`${cartItem.cost} ${strings.currency}`} x {cartItem.count}
              </span>
            </div>
            <div style={styles.productImageContainer}>
              <img
                src={`${url}/uploads/cat-thumbs/resized/${cartItem.product.category.image}`}
                style={styles.cartImage}
                alt='img'
              />
            </div>
          </div>

          <div style={styles.productFooter}>
            <div style={styles.controlCount}>
              <button
                type='button'
                style={styles.countHandlers}
                onClick={() => onChangeCount(cartItem._id, 'increase')}
              >
                <span style={styles.countText}>+</span>
              </button>
              <span style={styles.countText}>{cartItem.count}</span>
              <button
                type='button'
                style={styles.countHandlers}
                onClick={() => onChangeCount(cartItem._id, 'decrease')}
              >
                <span style={styles.countText}>-</span>
              </button>
            </div>
            <button
              type='button'
              style={styles.remove}
              onClick={() => onChangeCount(cartItem._id, 'delete')}
            >
              <FontAwesomeIcon icon={faTrash} style={styles.removeText} />
            </button>
          </div>
        </>
      )
    }
  }
  return <div style={styles.container}>{showItem()}</div>
}

export default React.memo(Item)
