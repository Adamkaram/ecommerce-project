import React, { Component, ReactElement } from "react";
import { connect } from "react-redux";
// import MainSlider from "../components/Slider/Slider";
import { getCategories } from "../redux/actions";
import * as UserActions from "../redux/actions/userAction";
import axios from "axios";
// import Head from "next/head";
import BestSeller from "../components/BestSeller/BestSeller";
import { url } from "../config/constants";
import { Banner, Product } from "../utils/interfaces";
import BannerImage from "../components/Banner/Banner";
import MainSlider from "../components/Slider/Slider";
import * as ProfileAction from "../redux/actions/ProfileAction";

interface Props {
  language: string;
  slidersWeb: Array<Banner>;
  slidersMob: Array<Banner>;
  bannersWeb: Array<Banner>;
  bannersMob: Array<Banner>;
  latestProducts: Array<Product>;
  best1: Array<Product>;
  best2: Array<Product>;
  pu499: Array<Product>;
  pu999: Array<Product>;
  width: number;
  checkIfLogin: Object;
  data: Object;
}

// interface State {}

class Index extends Component<Props, {}> {
  static async getInitialProps(): Promise<any> {
    const sliderUrlWeb = `${url}/app/slider-web`;
    const sliderUrlMob = `${url}/app/slider`;
    const [
      latestResponse,
      best1Res,
      best2Res,
      sliderResponseWeb,
      sliderResponseMob,
      bannerResponse,
      bannerMobResponse,
      u499,
      u999,
    ] = await Promise.all([
      axios.get(`${url}/app/product/latest`),
      axios.get(`${url}/app/product/best-seller`),
      axios.get(`${url}/app/product/best-seller2`),
      axios.get(sliderUrlWeb),
      axios.get(sliderUrlMob),
      axios.get(`${url}/app/banner-web`),
      axios.get(`${url}/app/banner`),
      axios.get(`${url}/app/product/499`),
      axios.get(`${url}/app/product/999`),
    ]);
    const slidersWeb = sliderResponseWeb.data.slider;
    const slidersMob = sliderResponseMob.data.slider;
    const latestProducts = latestResponse.data.products;
    const best1 = best1Res.data.products;
    const best2 = best2Res.data.products;
    const pu499 = u499.data.products;
    const pu999 = u999.data.products;
    const bannersWeb = bannerResponse.data.slider;
    const bannersMob = bannerMobResponse.data.slider;
    return {
      slidersWeb,
      slidersMob,
      latestProducts,
      best1,
      best2,
      pu499,
      pu999,
      bannersWeb,
      bannersMob,
    };
  }

  render(): ReactElement {
    const isAr = (): boolean => {
      return this.props.language === "ar";
    };
    const {
      slidersWeb,
      slidersMob,
      latestProducts,
      bannersWeb,
      width,
      language,
      best1,
      best2,
      pu499,
      pu999,
      bannersMob,
    } = this.props;
    return (
      <>
        {/* <MainSlider
          sliders={width > 600 ? slidersWeb : slidersMob}
          width={width}/>

        <BestSeller
          language={language}
          mobile={width < 600}
          products={latestProducts}
          title={isAr() ? "احدث المنتجات" : "Latest Products"}
        />
        <BannerImage banner={width > 600 ? bannersWeb[0] : bannersMob[0]} />
        <BestSeller
          language={language}
          products={best1}
          mobile={width < 600}
          title={isAr() ? "الأكثر مبيعاً" : "Best Seller"}
        />
        <BestSeller
          mobile={width < 600}
          language={language}
          products={best2}
          title="none"
        />
        <BannerImage banner={width > 600 ? bannersWeb[1] : bannersMob[1]} />
        <BannerImage banner={width > 600 ? bannersWeb[2] : bannersMob[2]} />
        <BestSeller
          language={language}
          products={pu499}
          mobile={width < 600}
          title={isAr() ? "منتجات اقل من ٤٩٩ ريال" : "Products under 499 SAR"}
        />
        <BannerImage banner={width > 600 ? bannersWeb[3] : bannersMob[3]} />
        <BestSeller
          language={language}
          products={pu999}
          mobile={width < 600}
          title={isAr() ? "منتجات اقل من ٩٩٩ ريال" : "Products under 999 SAR"}
        /> */}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    catsFromRedux: state.product.categories,
    languageFromRedux: state.user.language,
    slider2: state.product.sliders2,
    data: state.user.userData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCategories,
    checkIfLogin: () => dispatch(UserActions.checkIfLogin()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
