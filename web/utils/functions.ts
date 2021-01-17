import React from "react";
import { Product, Piece } from "./interfaces";
import Router from "next/router";

export const hasDiscount = (product: Product | Piece): boolean => {
  const discountDate = new Date(product.discountEnd);
  if (product.hasDiscount && discountDate > new Date()) {
    return true;
  }
  return false;
};

export const truncate = (txt: string, length = 50): string => {
  const end = "...";
  if (txt.length > length) {
    return txt.substring(0, length - end.length) + end;
  }
  return txt;
};
export const isAr = (language: string) => {
  return language === "ar";
};

export const changeHandler = (
  object: React.Component,
  name: string,
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const change = {};
  change[name] = e.target.value;
  object.setState(change);
};

export const redirectHelper = (res: any, url: string): void => {
  if (res) {
    res.writeHead(302, {
      Location: url,
    });

    res.end();
  } else {
    Router.replace(url);
  }
};
