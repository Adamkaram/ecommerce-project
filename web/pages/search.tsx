/* eslint-disable react/sort-comp */
import React, { Component } from "react";

import { connect } from "react-redux";
import translator, { Language } from "../utils/Translator";
import { NextPageContext } from "next";
import { Category, Product } from "../utils/interfaces";
// import Axios from "axios";
import { sort as sorting } from "../config/constants";
import { getProductsOfCategory, paginateProducts } from "../redux/actions";
import Head from "next/head";
import SearchComponent from "../components/Search/index";
import Filters from "../components/Search/Filters";

interface Props {
  language: Language;
  categories: Category[];
  category: string;
  getProducts: (
    id: string,
    page: number,
    sort: string,
    offers: number,
  ) => Promise<void>;
  paginationData: {
    products: Product[];
    lastPage: number;
    totalItems: number;
    loaded: number;
  };
  paginate: (
    category: string,
    page: number,
    sort: string,
    offers: number,
  ) => void;
}

interface State {
  category: string;
  query: string;
  page: number;
  sort: string;
  offers: number;
  endReached: boolean;
}

export class Search extends Component<Props, State> {
  strings = translator(this.props.language);

  constructor(props: Props) {
    super(props);
    const { category } = props;
    this.state = {
      category,
      page: 1,
      sort: sorting.LATEST.value,
      query: "",
      offers: 0,
      endReached: false,
    };
  }

  static async getInitialProps({ query }: NextPageContext) {
    const category = query.cat || "";
    return { category };
  }

  componentDidMount(): void {
    this.getProducts();
  }

  getProducts = async (): Promise<void> => {
    if (this.props.paginationData.lastPage == this.state.page) {
      this.setState({ endReached: true });
    }
    const { sort, offers, query } = this.state;
    const { category } = this.props;
    await this.props.getProducts(category, 1, sort, offers);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.getProducts();
    }
  }

  addPage = () => {
    if (this.props.paginationData.lastPage == this.state.page) {
      this.setState({ endReached: true });
    } else {
      this.setState(
        prevState => {
          return {
            page: prevState.page + 1,
          };
        },
        () => this.pagination(),
      );
    }
  };

  pagination = () => {
    const { page, sort, offers, category } = this.state;
    this.props.paginate(category, page, sort, offers);
  };

  onChangeSort = (sort: string) => {
    this.setState({ sort }, () => this.getProducts());
  };

  render() {
    const { categories, paginationData, language } = this.props;
    return (
      <>
        <Head>
          <title>{this.strings.search}</title>
        </Head>

        <SearchComponent
          products={paginationData.products}
          language={language}
          endReached={this.state.endReached}
          paginate={this.addPage}
          selectedSort={this.state.sort}
          onChangeSort={this.onChangeSort}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  language: state.user.language,
  categories: state.product.categories,
  paginationData: state.product.categoryProductsPagination,
});

const mapDispatchToProps = {
  getProducts: getProductsOfCategory,
  paginate: paginateProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
