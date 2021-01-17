/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { NextPageContext } from "next";
import ErrorPage from "../_error";
import Axios from "axios";
import { Product, ProductType } from "../../utils/interfaces";
import ProductSlider from "../../components/product/ProductSlider";
import { connect } from "react-redux";
import translator, { Language } from "../../utils/Translator";
import Head from "next/head";
import Pieces from "../../components/product/Pieces";
import AddToCartFlow from "../../components/product/AddToCartFlow";
import ProductInformation from "../../components/product/ProductInformation/ProductInformation";
import { addToCart } from "../../redux/actions/cartAction";
import { openCart } from "../../redux/actions/floatCart.actions";
import { toast } from "react-toastify";

interface Props {
  product: Product;
  language: Language;
  errorCode?: number;
  token: string;
  addToCart: (
    product: Product,
    productType: ProductType,
    pieceIndex: number,
    cost: any,
  ) => Promise<void>;
  openCart: () => void;
}
interface State {
  price: number;
  selectedPiece: number | null;
}

class ProductPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      price: props.product?.price,
      selectedPiece: null,
    };
  }

  static async getInitialProps({ query }: NextPageContext) {
    const { id } = query;
    try {
      const { product } = await (await Axios.get(`/app/product-by-id/${id}`))
        .data;
      return {
        product,
      };
    } catch (error) {
      return {
        errorCode: 404,
      };
    }
  }

  private isVariable = () => {
    const { product } = this.props;
    if (product.pieces) {
      return product.pieces.length > 0;
    }
    return false;
  };

  private strings = () => {
    return translator(this.props.language);
  };

  public _cartPriceHandler = () => {
    const { product } = this.props;
    if (!this.isVariable()) {
      const discountDate = new Date(product.discountEnd);
      if (product.hasDiscount && discountDate > new Date()) {
        return product.discountPrice;
      }
      return product.price;
    }
    if (this.state.selectedPiece == null) {
      return this.strings().pleaseSelectPiece;
    }
    const selectedPiece = product.pieces[this.state.selectedPiece];
    const discountDate = new Date(selectedPiece.discountEnd);
    if (selectedPiece.hasDiscount && discountDate > new Date()) {
      return selectedPiece.discountPrice;
    }
    return selectedPiece.price;
  };

  public disableAddToCartButton = (): any => {
    const { product } = this.props;
    if (!this.isVariable()) {
      return !(product.inStock > 0);
    }
    if (this.state.selectedPiece == null) {
      return true;
    }
    return !(product.pieces[this.state.selectedPiece].inStock > 0);
  };

  public addToCart = async (): Promise<void> => {
    if (this.props.token) {
      await this.props.addToCart(
        this.props.product,
        ProductType.product,
        this.state.selectedPiece,
        this._cartPriceHandler(),
      );
      this.props.openCart();
    } else {
      toast.error(this.strings().youMustLogin);
    }
  };

  public selectPiece = (index: number): void =>
    this.setState({ selectedPiece: index });

  render() {
    const { product, errorCode, language } = this.props;
    if (errorCode) {
      return <ErrorPage statusCode={errorCode} />;
    }
    return (
      <div
        style={{
          direction: language === "en" ? "ltr" : "rtl",
          textAlign: language === "en" ? "left" : "right",
        }}
      >
        <Head>
          <title>{product.title[language]}</title>
        </Head>
        <div>
          <ProductSlider
            product={product}
            addToCart={this.addToCart}
            disableAddToCart={this.disableAddToCartButton()}
          />

          {product.pieces.length > 0 && (
            <Pieces
              pieces={product.pieces}
              selectPiece={this.selectPiece}
              selectedPieceIndex={this.state.selectedPiece}
            />
          )}
        </div>
        <ProductInformation
          description={product.details}
          attr={product.specs}
        />
        <AddToCartFlow
          product={product}
          disableAddToCart={this.disableAddToCartButton()}
          price={this._cartPriceHandler()}
          addToCart={this.addToCart}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.user.language,
    token: state.user.user,
  };
};

const mapDispatchToCart = {
  addToCart,
  openCart,
};

export default connect(mapStateToProps, mapDispatchToCart)(ProductPage);
