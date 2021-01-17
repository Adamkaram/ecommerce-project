import React, { useEffect } from 'react'
import * as ProfileAction from '../../../../redux/actions/ProfileAction'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment/locale/ar'

const Delayed = ({ getDelayedOrder, delayedOrder, language }) => {
  moment.locale(language)
  useEffect(() => {
    getDelayedOrder()
  }, [])
  return (
    <div className='delayed'>
      <div className='delayed-products'>
        {delayedOrder.map(items => {
          var pieceIndex = items.pieceIndex
          // console.log(items.product.pieces[pieceIndex].attributes);
          if (items.product != null) {
            return (
              <div className='product' key={items._id}>
                <div>
                  <h6>{moment(items.created_at).fromNow()}</h6>
                  <p>{items.product.title[language]}</p>
                </div>
                {/* {items.product.pieces.find((piece, index) => {
                return index == pieceIndex;
              })} */}
                <dl>
                  <dt>
                    {items.product.pieces.length != 0
                      ? items.product.pieces[pieceIndex].attributes[0]
                          .attr_name[language]
                      : null}
                  </dt>
                  <dd>
                   
                    {items.product.pieces.length != 0
                      ? items.product.pieces[pieceIndex].attributes[0]
                          .attr_value[language]
                      : null}
                  </dd>
                </dl>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    delayedOrder: state.profile.delayedOrder,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDelayedOrder: () => dispatch(ProfileAction.getDelayedOrder()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Delayed)
