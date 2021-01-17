import React, { Component, ReactElement, useState } from "react";

// Styled-Component
import styled from "styled-components";

import { Container } from "react-bootstrap";

import Slider from "react-slick";
import { Banner } from "../../utils/interfaces";
import { url } from "../../config/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import Link from "next/link";

const Slide = styled.div`
  margin: 0;

  @media (max-width: 600px) {
    margin: 0px 0px !important;
  }

  .slick-next {
    right: 0px;
  }

  .slick-prev {
    left: 0px;
  }

  .slick-arrow {
    z-index: 9999;

    &::before {
      color: #000;
    }
    @media (max-width: 600px) {
      display: none !important;
    }
  }

  img {
    width: 100%;
  }
`;

interface Props {
  sliders: Array<Banner>;
  width: number;
  searchProducts: any;
}

const MainSlider: React.FC<Props> = ({
  sliders,
  width,
  searchProducts,
}): ReactElement => {
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
  const _renderImages = () => {
    const imgStyle = {
      width: "100%",
      height: "auto",
    };
    return sliders.map(slider => {
      return (
        <div key={slider._id}>
          <Link
            href={`${
              slider.refType == "product"
                ? `/p/${slider.refId._id}`
                : `/search?cat=${slider.refId._id}`
              }`}
          >
            <a onMouseDown={e => handleOnMouseDown(e)}
              onClick={e => handleOnClick(e)}>
              <img
                src={`${url}/uploads/slider/${
                  width > 600 ? "web" : "resized"
                  }/${slider.image}`}
                alt="slider"
                style={imgStyle}
              />
            </a>
          </Link>
        </div>
      );
    });
  };
  const ArrowLeft = props => {
    const { onClick } = props;

    return (
      <button
        type="button"
        // {...props}
        onClick={onClick}
        className={(props.next, "newArrowNext newArrows")}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    );
  };
  const ArrowRight = props => {
    const { onClick } = props;

    return (
      <button
        type="button"
        // {...props}
        onClick={onClick}
        className={(props.next, "newArrowPrev newArrows")}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    );
  };

  const settings = {
    className: "",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    prevArrow: searchProducts.length === 0 ? <ArrowLeft /> : null,
    nextArrow: searchProducts.length === 0 ? <ArrowRight /> : null,

    speed: 500,
    autoplaySpeed: 5000,
  };
  return (
    <Slide>
      <Slider {...settings} className="Hello">
        {_renderImages()}
      </Slider>
    </Slide>
  );
};

const mapStateToProps = state => {
  return {
    searchProducts: state.profile.searchProducts,
  };
};

export default connect(mapStateToProps)(MainSlider);
