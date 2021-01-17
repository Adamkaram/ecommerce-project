import React, { useState } from "react";

// // Navbar Component import
import OneSlide from "./OneSlide/OneSlide";
import Aside from "./Aside/Aside";
import { Category } from "../../utils/interfaces";

interface Props {
  categories: Array<Category>;
  language: string;
  changeLanguage(e): void;
}

const MobileNavbar: React.FC<Props> = ({
  categories,
  language,
  changeLanguage
}) => {
  const [slide, setSlide] = useState<boolean>(false);

  const handler = (): void => {
    setSlide(!slide);
  };

  return (
    <nav>
      <div>
        <OneSlide slide={slide} action={handler} />
      </div>
      <aside>
        <Aside
          action={handler}
          statue={slide}
          changeLanguage={changeLanguage}
          categories={categories}
        />
      </aside>
    </nav>
  );
};

export default MobileNavbar;
