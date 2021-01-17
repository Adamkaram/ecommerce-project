import React, { ReactElement } from "react";
import BestSellerSlider from "./BestSellerSlider/BestSellerSlider";
import { Row, Col } from "react-bootstrap";
import { Product } from "../../utils/interfaces";

interface Props {
  title?: string;
  language: string;
  products: Array<Product>;
  mobile: boolean;
}

const BestSeller: React.FC<Props> = ({
  title,
  language,
  products,
  mobile,
}): ReactElement => {
  return (
    <div
      className="best-seller"
      style={{
        direction: language === "en" ? "ltr" : "rtl",
        textAlign: language === "en" ? "left" : "right",
      }}
    >
      {title !== "none" && (
        <Row className="header">
          <Col
            style={{
              direction: language === "en" ? "ltr" : "rtl",
              textAlign: language === "en" ? "left" : "right",
            }}
          >
            <p className="slider-title">{title}</p>
          </Col>
        </Row>
      )}
      <BestSellerSlider
        mobile={mobile}
        language={language}
        products={products}
      />
    </div>
  );
};

export default BestSeller;
