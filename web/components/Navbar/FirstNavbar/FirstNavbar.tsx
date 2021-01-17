import React from "react";

// Styled-Component
import styled from "styled-components";

// FontAwsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Link from "next/link";
// FontAwsome Icons
import {
  faGlobeAmericas,
  faTruck,
  faUserCheck,
  faPercentage,
} from "@fortawesome/free-solid-svg-icons";

const FirstNavbar = ({ language, changeLanguage }) => {
  return (
    <div
      className="first-nav"
      style={{ direction: language === "en" ? "ltr" : "rtl" }}
    >
      <div
        className="nav-info"
        style={{ direction: language === "en" ? "ltr" : "rtl" }}
      >
        <div>
          <FontAwesomeIcon size="sm" icon={faTruck} />
          {language === "en" ? (
            <p>free shipping for products with 200 SAR</p>
          ) : (
            <p>توصيل مجانى للمنتجات فوق ٢٠٠ ريال</p>
          )}
        </div>
        <div>
          <FontAwesomeIcon size="sm" icon={faUserCheck} />
          {language === "en" ? (
            <p>charge for free first 200 SAR</p>
          ) : (
            <p>ارجاع مجانى بسهولة</p>
          )}
        </div>
        <div>
          <FontAwesomeIcon size="sm" icon={faPercentage} />
          {language === "en" ? (
            <p>charge for f3ree first 400 ryal</p>
          ) : (
            <p>افضل العروض</p>
          )}
        </div>
      </div>
      <div className="languages">
        <span>
          <FontAwesomeIcon icon={faGlobeAmericas} />
          {language === "en" ? <p>Langauge</p> : <p>اللغه</p>}
        </span>
        <span>
          <a
            href={language === "en" ? "/ar" : "/en"}
            onClick={changeLanguage}
            style={{ color: "#fff" }}
          >
            {language === "en" ? "العربيه" : "English"}
          </a>
        </span>
      </div>
    </div>
  );
};

export default FirstNavbar;
