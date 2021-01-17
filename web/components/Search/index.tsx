/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useRef, useEffect } from "react";
import Item from "../BestSeller/BestSellerSlider/Item";
import { Language } from "../../utils/Translator";
import { Product } from "../../utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { sort } from "../../config/constants";
import translator from "../../utils/Translator";
import EmptyItem from "./EmptyItem"
import { connect } from "react-redux";
import Loading from "../Loading/Loading";


interface Props {
  language: Language;
  products: Product[];
  selectedSort: string;
  onChangeSort: (sort: string) => void;
  endReached: boolean;
  paginate: () => void;
  productsOfCategory: Array<any>
}

const SearchComponent: FC<Props> = ({
  products,
  language,
  onChangeSort,
  selectedSort,
  endReached,
  paginate,
  productsOfCategory
}) => {
  const [filterClasses, setFilterClasses] = useState<string[]>(["sideBar"]);
  const handleFilter = (): void => {
    if (filterClasses.length > 1) {
      setFilterClasses(["sideBar"]);
    } else {
      setFilterClasses(["sideBar", "sideBar-Mobile"]);
    }
  };

  const renderProducts = () => {
    return products.map(product => {
      return (
        <div key={product._id} className="search-products">
          <Item product={product} language={language} />
        </div>
      );
    });
  };

  const useOutsideAlerter = ref => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          filterClasses.length === 2
        ) {
          setFilterClasses(["sideBar"]);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, filterClasses]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const renderSorting = () => {
    return Object.entries(sort).map(([key, val]) => {
      return (
        <tr key={sort[key].value}>
          <td>
            <label
              htmlFor={sort[key].value}
              onClick={() => onChangeSort(sort[key].value)}
            >
              <input
                type="radio"
                name={sort[key].value}
                className="ml-1 mr-1"
                checked={sort[key].value == selectedSort}
              />

              {sort[key].label[language]}
            </label>
          </td>
        </tr>
      );
    });
  };
  const strings = translator(language);

  return (
    <div
      style={{
        direction: language === "en" ? "ltr" : "rtl",
        textAlign: language === "en" ? "left" : "right",
      }}
      className="cent"
    >
      <div ref={wrapperRef} className={filterClasses.join(" ")}>
        <div>
          <h4>{strings.filter}</h4>
          <table>
            <tbody>{renderSorting()}</tbody>
          </table>
        </div>
        {/* <div>
          <h4>الفئات</h4>
          <table>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" /> القسم{" "}
                </td>
                <td>(رقم هنا)</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" /> القسم{" "}
                </td>
                <td>(رقم هنا)</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" /> القسم{" "}
                </td>
                <td>(رقم هنا)</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" /> القسم{" "}
                </td>
                <td>(رقم هنا)</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" /> القسم{" "}
                </td>
                <td>(رقم هنا)</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
      <div className="head-center">
        {filterClasses.length === 1 && (
          <div className="filter-product">
            <div className="icon" onClick={handleFilter}>
              <FontAwesomeIcon icon={faFilter} size="xs" />
            </div>
          </div>
        )}
        {productsOfCategory ? <Loading /> : null}
        {products.length == 0 && !productsOfCategory ? <EmptyItem /> : (<div className="products"> {renderProducts()} </div>)}

        {!endReached && (
          <button
            onClick={() => paginate()}
            className="pr-5 pl-5 center pure-material-button-contained"
            type="button"
          >
            {strings.next}
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    productsOfCategory: state.product.productsOfCategory
  }
}

export default connect(mapStateToProps)(SearchComponent)
