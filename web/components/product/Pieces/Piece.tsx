/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import { Piece } from "../../../utils/interfaces";
import { url } from "../../../config/constants";
import translator, { Language } from "../../../utils/Translator";
import { connect } from "react-redux";
import PricePiece from "../PricePiece";
import { Button } from "react-bootstrap";

interface Props {
  piece: Piece;
  language: Language;
  index: number;
  selectedPieceIndex: number | null;
  selectPiece: (index: number) => void;
  addDelayed?: (index: number) => void;
}

const PieceComponent: React.FC<Props> = ({
  piece,
  language,
  index,
  selectPiece,
  selectedPieceIndex,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [src, setSrc] = useState<string>(piece.images[0]);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const settingsSec = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoScroll: true,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const strings = translator(language);

  return (
    <div>
      <div
        className="products-like-item"
        style={{ direction: language === "ar" ? "rtl" : "ltr" }}
      >
        <div className="item-head">
          {piece.attributes.map(attr => {
            return (
              <div
                key={Math.random().toString() + attr.attr_name}
                style={{ direction: language === "ar" ? "rtl" : "ltr" }}
              >
                <span>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>{attr.attr_name[language]}</p>
                </span>
                <span>{attr.attr_value[language]}</span>
              </div>
            );
          })}
        </div>
        <div className="item-center">
          <Slider {...settingsSec}>
            {piece.images.map(img => {
              return (
                <div key={img}>
                  <img
                    alt="product"
                    src={`${url}/uploads/products/resized/${src}`}
                    onClick={() => {
                      setSrc(img);
                      setIsOpen(true);
                    }}
                  />
                </div>
              );
            })}
          </Slider>
          {isOpen && (
            <Lightbox
              mainSrc={`${url}/uploads/products/resized/${piece.images[photoIndex]}`}
              onCloseRequest={() => setIsOpen(false)}
              nextSrc={`
                    ${url}/uploads/products/resized/${
                piece.images[(photoIndex + 1) % piece.images.length]
              }
                    `}
              prevSrc={`${url}/uploads/products/resized/${
                piece.images[
                  (photoIndex + piece.images.length - 1) % piece.images.length
                ]
              }`}
              onMovePrevRequest={() => {
                setPhotoIndex(
                  (photoIndex + piece.images.length - 1) % piece.images.length,
                );
              }}
              onMoveNextRequest={() => {
                setPhotoIndex((photoIndex + 1) % piece.images.length);
              }}
            />
          )}
        </div>
        <PricePiece product={piece} language={language} />
        <div className="item-button-select">
          {piece.inStock > 0 ? (
            <button
              type="button"
              className={
                index === selectedPieceIndex ? "selected block" : "block"
              }
              disabled={piece.inStock < 1}
              style={{ display: "block !important" }}
              onClick={() => selectPiece(index)}
            >
              {index === selectedPieceIndex
                ? strings.pieceSelected
                : strings.selectPiece}
            </button>
          ) : (
            <Button style={{ color: "#fff", borderWidth: 0 }}>
              {strings.delayOrder}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    language: state.user.language,
  };
};

export default connect(mapStateToProps)(PieceComponent);
