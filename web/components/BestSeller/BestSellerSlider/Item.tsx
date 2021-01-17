import { useState } from "react";
import { url } from "../../../config/constants";
import { Product } from "../../../utils/interfaces";
import { truncate, isAr } from "../../../utils/functions";
import Price from "../../product/Price";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import * as ProfileActions from "../../../redux/actions/ProfileAction";
import { connect } from "react-redux";

interface Props {
  product: Product;
  language: string;
  addToFavorite: (id: string) => void;
  favorites: Array<Product>;
  token: string;
}
const Item: React.FC<Props> = ({
  product,
  language,
  addToFavorite,
  favorites,
  token,
}) => {
  const [clientXonMouseDown, setClientXonMouseDown] = useState(null);
  const [clientYonMouseDown, setClientYonMouseDown] = useState(null);

  const handleOnMouseDown = e => {
    setClientXonMouseDown(e.clientX);
    setClientYonMouseDown(e.clientY);
    e.preventDefault(); // stops weird link dragging effect
  };

  const handleOnClick = e => {
    e.stopPropagation();
    if (clientXonMouseDown !== e.clientX || clientYonMouseDown !== e.clientY) {
      // prevent link click if the element was dragged
      e.preventDefault();
    }
  };

  const handleAddToFav = (e, id) => {
    e.preventDefault();
    addToFavorite(id);
  };

  const checkHeart = () => {
    const newHeart = favorites.some(items => items._id == product._id);
    if (newHeart) {
      return (
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: "red" }}
          onClick={e => handleAddToFav(e, product._id)}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: "#555" }}
          onClick={e => handleAddToFav(e, product._id)}
        />
      );
    }
  };

  const openShare = (e) => {
    e.preventDefault();
  }
  return (
    <Link href="/p/[id]" as={`/p/${product._id}`}>
      <a
        onMouseDown={e => handleOnMouseDown(e)}
        onClick={e => handleOnClick(e)}
      >
        <div
          style={{
            direction: isAr(language) ? "rtl" : "ltr",
            textAlign: isAr(language) ? "right" : "left",
          }}
          className="product-slider"
        >
          <div className="header">
            <img
              src={`${url}/uploads/products/resized/${
                product.images[product.images.length - 1]
                }`}
              alt="product"
            />

            {token == null ? null :
              <>
                {checkHeart()}
              </>}

          </div>
          <div className="information">
            <div className="head">
              <p>{isAr(language) ? product.brand.ar : product.brand.en}</p>
              <p>
                {isAr(language)
                  ? truncate(product.title.ar)
                  : truncate(product.title.en)}
              </p>
            </div>
            <Price product={product} language={language} />
            {product.isOffer && (
              <div className="footer">
                <button type="button">
                  {isAr(language) ? "عرض خاص" : "Special Offer"}
                </button>
              </div>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};
const mapStateToProps = state => {
  return {
    favorites: state.profile.favorites,
    token: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToFavorite: id => dispatch(ProfileActions.addToFavorite(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
