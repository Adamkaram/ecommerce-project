import React, { ReactElement } from "react";

// Components import
import Navbar from "../Navbar/Navbar";
import MobileNavbar from "../Mobile-Navbar/Mobile-Navbar";
import { Category } from "../../utils/interfaces";
import { connect } from "react-redux";

interface Props {
  language: string;
  width: number;
  categories: Array<Category>;
  changeLanguage(e): void;
}

const Categories: React.FC<Props> = ({
  language,
  width,
  categories,
  changeLanguage,
}): ReactElement => {
  return (
    <div
      style={{
        direction: language === "en" ? "ltr" : "rtl",
        textAlign: language === "en" ? "left" : "right",
      }}
    >
      {width <= 600 ? (
        <MobileNavbar
          language={language}
          changeLanguage={changeLanguage}
          categories={categories}
        />
      ) : (
        <Navbar
          language={language}
          changeLanguage={changeLanguage}
          categories={categories}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.product.categories,
  };
};

export default connect(mapStateToProps)(Categories);
