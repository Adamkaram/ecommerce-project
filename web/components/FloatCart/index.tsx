import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { OrderCartItem } from "../../utils/interfaces";
import { connect } from "react-redux";
import Item from "./Item";
import translator, { Language } from "../../utils/Translator";
import { openCart, closeCart } from "../../redux/actions/floatCart.actions";
import { updateCartItem } from "../../redux/actions/cartAction";
import * as ProfileActions from "../../redux/actions/ProfileAction";
import ButtonOrder from "./ButtonOrder";
import MakeOrder from "./makeOrder";
import EmptySvg from "./EmptySvg";
import { Button } from "react-bootstrap";
import Link from "next/link";

interface Props {
  cartItems: OrderCartItem[];
  language: Language;
  open: boolean;
  windowIsOpen: boolean;
  isOrder: boolean;
  openFloatCart: (data: boolean) => void;
  callAddress: () => void;
  setOpen: () => void;
  setClose: () => void;
  onChangeCount: (cartItem: string, method: string) => void;
}

const FloatCart: React.FC<Props> = ({
  cartItems,
  language,
  setOpen,
  setClose,
  open,
  openFloatCart,
  onChangeCount,
  callAddress,
  isOrder,
  windowIsOpen,
}) => {
  const strings = translator(language);

  const classes = ["float-cart"];

  if (windowIsOpen) {
    classes.push("float-cart--open");
  }

  const getTotal = () => {
    let total = 0;
    cartItems.forEach((item, i) => {
      total += item.cost * item.count;
    });
    return total;
  };
  return (
    <div className={classes.join(" ")}>
      {windowIsOpen && (
        <div
          onClick={() => openFloatCart(false)}
          className="float-cart__close-btn"
        >
          X
        </div>
      )}

      {!windowIsOpen && (
        <span
          onClick={() => openFloatCart(true)}
          className="bag bag--float-cart-closed"
        >
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="cart-float-icon"
            size="10x"
          />
          <span className="bag__quantity">{cartItems.length}</span>
        </span>
      )}

      <div className="float-cart__content">
        <div className="float-cart__header">
          <span className="bag">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="cart-float-icon"
              size="10x"
              style={{ color: "#007BFF" }}
            />
            {cartItems.length && (
              <span className="bag__quantity">{cartItems.length}</span>
            )}
          </span>
          <span className="header-title">{strings.cart}</span>
        </div>

        {isOrder ? (
          <MakeOrder />
        ) : (
            <div className="float-cart__shelf-container">
              {cartItems.length ? (
                <div className="cart-items-container">
                  {cartItems.map(item => {
                    return (
                      <Item
                        onChangeCount={onChangeCount}
                        language={language}
                        key={item._id}
                        cartItem={item}
                      />
                    );
                  })}
                </div>
              ) : (
                  <>
                    <EmptySvg />
                    <div>
                      <h5>للأسف لا يوجد منتجات فالسلة</h5>
                    </div>
                  </>
                )}
            </div>
          )}

        {cartItems.length == 0 ? null : (
          <>
            <hr />
            <div
              className="float-cart__footer"
              style={{ direction: language === "ar" ? "rtl" : "ltr", textAlign: language === "ar" ? "right" : "left" }}
            >
              <div>
                <p> {strings.total}</p>
                <p className="sub-price__val">
                  {`${getTotal()} ${strings.currency}`}
                </p>
              </div>
              <ButtonOrder language={language} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems,
    language: state.user.language,
    open: state.floatCart.open,
    isOrder: state.profile.isOrder,
    windowIsOpen: state.profile.windowIsOpen,
  };
};

const mapDispatchToProps = {
  setOpen: openCart,
  setClose: closeCart,
  onChangeCount: updateCartItem,
  callAddress: ProfileActions.getAddress(),
  openFloatCart: ProfileActions.openFloatCart,
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(FloatCart),
);
