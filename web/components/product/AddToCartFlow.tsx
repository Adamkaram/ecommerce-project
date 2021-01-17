import React from "react";
import { Product } from "../../utils/interfaces";
import { connect } from "react-redux";
import { Language } from "../../utils/Translator";
import translator from "../../utils/Translator";
import { url } from "../../config/constants";
import { truncate } from "../../utils/functions";

interface Props {
  product: Product;
  language: Language;
  device: string;
  disableAddToCart: boolean;
  price: string | number;
  addToCart: () => void;
}

const AddToCartFlow: React.FC<Props> = ({
  product,
  language,
  device,
  disableAddToCart,
  price,
  addToCart,
}) => {
  const strings = translator(language);
  const _cartPriceHandler = () => {
    if (disableAddToCart) {
      return strings.pleaseSelectPiece;
    }

    return price + strings.currency;
  };
  return (
    <div className="blurred-add">
      <div className="row">
        <img
          src={`${url}/uploads/products/resized/${
            product.images[product.images.length - 1]
          }`}
          alt="thumb"
          height="45"
          style={{
            marginLeft: language === "ar" ? 5 : 0,
            marginRight: language === "en" ? 5 : 0,
          }}
        />
        <div className="column">
          <p>
            {device === "web"
              ? product.title[language]
              : truncate(product.title[language], 38)}
          </p>
          <p style={{ color: "rgba(94, 92, 230, 0.8)", fontWeight: "bold" }}>
            {_cartPriceHandler()}
          </p>
        </div>
      </div>
      <div className="row">
        <button
          type="button"
          disabled={disableAddToCart}
          style={{ backgroundColor: disableAddToCart && "#a0a0a0" }}
          onClick={() => addToCart()}
        >
          {strings.addToCart}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    language: state.user.language,
    device: state.user.device,
  };
};

export default connect(mapStateToProps)(AddToCartFlow);
