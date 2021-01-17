/* eslint-disable react/no-danger */
import React, { ReactElement } from "react";
import App from "next/app";
import "react-toastify/dist/ReactToastify.css";
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer/Footer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import withRedux, { NextJSAppContext } from "next-redux-wrapper";
import reduxThunk from "redux-thunk";
import reducers from "../redux/reducers";
import * as types from "../redux/types";
import Axios from "axios";
import cookies from "next-cookies";
import Cookies from "js-cookie";
import { url } from "../config/constants";
import { Category } from "../utils/interfaces";
import MobileDetect from "mobile-detect";
import { ToastContainer } from "react-toastify";
import FloatCart from "../components/FloatCart";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";

import makeStore from "../redux/store";
import { connect } from "react-redux";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// const makeStore = (initialState): any => {
//   return createStore(reducers, initialState, applyMiddleware(reduxThunk));
// };

interface Props {
  language: string;
  store: any;
  web: boolean;
  token?: string;
}

export class MyApp extends App<Props> {
  constructor(props) {
    super(props);
    Axios.defaults.baseURL = url;
  }

  static async getInitialProps({
    Component,
    ctx,
  }: NextJSAppContext): Promise<any> {
    const { token } = cookies(ctx);
    if (ctx.req) {
      if (token) {
        ctx.store.dispatch({ type: types.SET_TOKEN, payload: token });
        try {
          const cartRes = await Axios.get(`${url}/app/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          ctx.store.dispatch({
            type: types.GET_CART_ITEMS,
            payload: cartRes.data.items,
          });
        } catch (error) {
          ctx.store.dispatch({ type: types.GET_CART_ITEMS, payload: [] });
        }
        if (token) {
          try {
            const response = await Axios.get(`${url}/api/user/get-data`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            ctx.store.dispatch({
              type: types.SAVE_TOKEN,
              payload: response.data,
            });
          } catch (error) {
            console.log(error);
          }
        }
        if (token) {
          try {
            ctx.store.dispatch({ type: "FAV_IS_LOADING", payload: true });
            const response = await Axios.get(`${url}/app/favorite`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = response.data.products;
            ctx.store.dispatch({ type: "SAVE_FAVORITES", payload: data });
            ctx.store.dispatch({ type: "FAV_IS_LOADING", payload: false });
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    const { req } = ctx;
    let web = true;
    if (req) {
      const md = new MobileDetect(req.headers["user-agent"]);
      web = md.mobile() === null;
    } else if (window) {
      web = window.innerWidth > 768;
    }
    const language = cookies(ctx).language || "ar";
    if (req) {
      ctx.store.dispatch({
        type: types.CHANGE_LANGUAGE,
        payload: language,
      });
      const cats = await Axios.get(`${url}/app/category/get-parents`);
      const children = await Axios.get(`${url}/app/category/get-children`);
      const constants = await Axios.get(`${url}/app/constants`);

      ctx.store.dispatch({
        type: types.GET_CONSTANTS,
        payload: constants.data.data,
      });
      ctx.store.dispatch({
        type: types.GET_CATEGORIES,
        payload: cats.data.cats,
      });
      ctx.store.dispatch({
        type: types.SET_DEVICE,
        payload: web ? "web" : "mob",
      });
      ctx.store.dispatch({
        type: types.GET_CHILDREN_ALL,
        payload: children.data.cats,
      });
    }
    return { pageProps, language, web, token };
  }

  changeLanguage = (e: any): void => {
    e.preventDefault();
    const { language } = this.props;
    const newLanguage = language === "ar" ? "en" : "ar";
    Cookies.set("language", newLanguage);
    window.location.reload();
  };

  componentDidMount() {
    if (typeof document !== "undefined") {
      Axios.interceptors.request.use(
        config => {
          NProgress.start();
          return config;
        },
        error => {
          NProgress.done();
          return Promise.reject(error);
        },
      );
      Axios.interceptors.response.use(
        config => {
          NProgress.done();
          return config;
        },
        error => {
          NProgress.done();
          return Promise.reject(error);
        },
      );
    }
    Axios.defaults.headers.Authorization = `Bearer ${this.props.token}`;
  }

  render(): ReactElement {
    const { Component, pageProps, store, language, web, token } = this.props;

    return (
      <>
        <Head>
          <title>ويتوب - Wetop</title>
          <link href="/css/slick.css" rel="stylesheet" />
          <link href="/css/bootstrap-grid.min.css" rel="stylesheet" />
          <link href="/css/layout.css" rel="stylesheet" />
          <link href="/css/newLayout.css" rel="stylesheet" />
          <link rel="icon" href="/images/logo.png" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
         <!--   ______ _                        _    _____        __ _   
            |  ____| |                      | |  / ____|      / _| |  
            | |__  | | ___  __ _  __ _ _ __ | |_| (___   ___ | |_| |_ 
            |  __| | |/ _ \\/ _ | '_ \\| __|\\___ \\ / _ \\|  _| __|
            | |____| |  __| (_| | (_| | | | | |_ ____) | (_) | | | |_ 
            |______|_|\\___|\\__, |\\__,_|_| |_|\\__|_____/ \\___/|_|  \\__|
                            __/ |                                     
                           |___/                                      
            
           -->
          `,
            }}
          />
        </Head>

        <Provider store={store}>
          <Categories
            changeLanguage={(e): void => this.changeLanguage(e)}
            width={web ? 1024 : 500}
            language={language}
          />
          <div className="container">
            <div
              style={{
                position: "fixed",
                top: 20,
                right: 20,
                zIndex: 999,
              }}
            >
              <ToastContainer />
            </div>
            <Component
              {...pageProps}
              width={web ? 1024 : 500}
              language={language}
            />
          </div>
          {token && <FloatCart />}
          <Footer />
        </Provider>
      </>
    );
  }
}

export default withRedux(makeStore, { storeKey: "webayApp" })(MyApp);
