/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from "react";

import Slider from "react-slick";
import PieceComponent from "./Piece";
import { connect } from "react-redux";
import { Language } from "../../../utils/Translator";
import translator from "../../../utils/Translator";
import { Piece } from "../../../utils/interfaces";

interface Props {
  language: Language;
  pieces: Piece[];
  selectedPieceIndex: number | null;
  selectPiece: (index: number) => void;
}

const Pieces: React.FC<Props> = ({
  language,
  pieces,
  selectedPieceIndex,
  selectPiece,
}) => {
  const strings = translator(language);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 2,
          initialSlide: 1,
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

  return (
    <div className="products-like">
      <h5 className="m-2">{strings.choosePiece}</h5>
      <div className="products-like-container" style={{ direction: "ltr" }}>
        <Slider {...settings}>
          {pieces.map((piece, index) => {
            return (
              <PieceComponent
                piece={piece}
                index={index}
                key={piece._id}
                selectPiece={selectPiece}
                selectedPieceIndex={selectedPieceIndex}
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    language: state.user.language,
  };
};

export default connect(mapStateToProps)(Pieces);
