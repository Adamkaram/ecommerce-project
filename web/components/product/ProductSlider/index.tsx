/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faUserShield,
  faTruckMoving,
  faUndo,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import { Product } from "../../../utils/interfaces";
import { url } from "../../../config/constants";
import { connect } from "react-redux";
import Link from "next/link";
import Price from "../Price";
import translator, { Language } from "../../../utils/Translator";
import ShareButtons from "./ShareButtons"

interface Props {
  product: Product;
  language: Language;
  disableAddToCart: boolean;
  addToCart: () => void;
}

const ProductItems: React.FC<Props> = ({
  product,
  language,
  disableAddToCart,
  addToCart,
}) => {
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  const [primImg, setPrimImg] = useState<string>(
    product.images[product.images.length - 1],
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChangeImg = (img: string, i: number) => {
    setPhotoIndex(i);
    setPrimImg(img);
  };

  const strings = translator(language);

  // const { photoIndex, isOpen, img } = this.state;

  return (
    <div className="product">
      <Container fluid>
        <Row>
          <Col xs={12} className="header">
            <Link href="/">
              <a>{strings.main}</a>
            </Link>
            {language === "en" ? (
              <FontAwesomeIcon icon={faChevronRight} size="xs" />
            ) : (
                <FontAwesomeIcon icon={faChevronLeft} size="xs" />
              )}
            <a>{product.title[language]}</a>
          </Col>

          <Col xs={12} className="product">
            <div className="information">
              <div>
                <p className="owner">{product.brand[language]}</p>
                <h5 className="products-name">{product.title[language]}</h5>
                <div className="mt-2" >
                  <Price size={30} product={product} language={language} />
                </div>
              </div>
              <form>
                {/* <h6>Quantity</h6> */}
                {product.inStock > 0 && (
                  <div>
                    <button
                      type="button"
                      disabled={disableAddToCart}
                      className="add-to-cart"
                      onClick={() => addToCart()}
                    >
                      {disableAddToCart
                        ? strings.pleaseSelectPiece
                        : strings.addToCart}
                    </button>
                  </div>
                )}
              </form>
            </div>

            <div className="imgs">
              <div className="containerImgs">
                {product.images.map((img, i) => {
                  return (
                    <img
                      key={img}
                      src={`${url}/uploads/products/resized/${img}`}
                      alt="product"
                      onClick={() => handleChangeImg(img, i)}
                    />
                  );
                })}
              </div>
              <div>
                <img
                  src={`${url}/uploads/products/resized/${primImg}`}
                  alt="ahh"
                  onClick={() => setIsOpen(true)}
                />
              </div>
            </div>

            <div>
              {isOpen && (
                <Lightbox
                  mainSrc={`${url}/uploads/products/resized/${product.images[photoIndex]}`}
                  nextSrc={`
                    ${url}/uploads/products/resized/${
                    product.images[(photoIndex + 1) % product.images.length]
                    }
                    `}
                  prevSrc={`${url}/uploads/products/resized/${
                    product.images[
                    (photoIndex + product.images.length - 1) %
                    product.images.length
                    ]
                    }`}
                  onCloseRequest={() => setIsOpen(false)}
                  onMovePrevRequest={() => {
                    setPhotoIndex(
                      (photoIndex + product.images.length - 1) %
                      product.images.length,
                    );
                  }}
                  onMoveNextRequest={() => {
                    setPhotoIndex((photoIndex + 1) % product.images.length);
                  }}
                />
              )}
            </div>

            <div className="ship">
              <div>
                <div>
                  <FontAwesomeIcon icon={faTruckMoving} size="xs" />
                  <p>{strings.freeShipping}</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faUndo} size="xs" />
                  <p>{strings.easyReturn}</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faUserShield} size="xs" />
                  <p>{strings.secureShipping}</p>
                </div>
              </div>
              <div>
                <ShareButtons id={product._id} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    language: state.user.language,
  };
};

export default connect(mapStateToProps)(ProductItems);
