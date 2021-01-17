import React from "react";

// // Navbar Component import
import FirstNavbar from "./FirstNavbar/FirstNavbar";
import SecNavbar from "./SecNavbar/SecNavbar";
import ListNavbar from "./List/ListNavbar";

const Navbar = ({ language, changeLanguage, categories }) => {
  return (
    <nav>
      <div>
        <FirstNavbar language={language} changeLanguage={changeLanguage} />
      </div>
      <div>
        <SecNavbar language={language} />
      </div>
      <div>
        <ListNavbar
          // language={language}
          categories={categories}
        />
      </div>
    </nav>
  );
};

export default Navbar;
