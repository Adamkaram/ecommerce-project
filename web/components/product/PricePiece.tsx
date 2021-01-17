import React, { ReactElement } from "react";
import { Piece } from "../../utils/interfaces";
import { hasDiscount, isAr } from "../../utils/functions";
import { currency } from "../../config/constants";

interface Props {
  product: Piece;
  language: string;
  size?: number;
}

const PricePiece: React.FC<Props> = ({
  product,
  language,
  size = 14,
}): ReactElement => {
  if (hasDiscount(product)) {
    return (
      <div className="center" style={{ fontSize: size, display: "flex" }}>
        <p className="real-price">
          {`${product.discountPrice} ${
            isAr(language) ? currency.ar : currency.en
          }`}
        </p>
        <p
          className="fake-price"
          style={{
            fontSize: size - 2,
            fontWeight: 100,
            color: "#999",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {` ${product.price} ${isAr(language) ? currency.ar : currency.en} `}
        </p>
      </div>
    );
  }
  return (
    <div className="center" style={{ fontSize: size }}>
      <p className="real-price">
        {`${product.price} ${isAr(language) ? currency.ar : currency.en}`}
      </p>
    </div>
  );
};
export default PricePiece;
