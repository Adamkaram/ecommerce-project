/* eslint-disable camelcase */
enum BannerRef {
  category = "category",
  product = "product",
}

export interface TranslatableString {
  ar: string;
  en: string;
}

export interface Banner {
  _id: string;
  image: string;
  refType: BannerRef;
  refId: any;
}

export interface Category {
  _id: string;
  name: TranslatableString;
  parentId: string | null;
  image: string;
}

interface Attribute {
  attr_name: TranslatableString;
  attr_value: TranslatableString;
}

export interface Piece {
  attributes: Array<Attribute>;
  _id: string;
  inStock: number;
  price: number;
  hasDiscount: boolean;
  discountPrice: number;
  discountEnd: Date;
  images: Array<string>;
}

interface Review {
  stars: number;
  comment: string;
}

export interface Species {
  title: TranslatableString;
  details: TranslatableString;
}

export interface Product {
  _id: string;
  title: TranslatableString;
  details: TranslatableString;
  categories: Array<Category>;
  attributes: Array<Attribute>;
  pieces: Array<Piece>;
  price: number;
  hasDiscount: boolean;
  discountPrice: number;
  discountEnd: Date;
  reviews: Array<Review>;
  images: Array<string>;
  specs: Array<Species>;
  created_at: Date;
  view: number;
  brand: TranslatableString;
  isOffer: boolean;
  sold: number;
  inStock: number;
}
export interface CardProduct {
  _id: string;
  title: TranslatableString;
  details: TranslatableString;
  category: Category;
  price: number;
  hasDiscount: boolean;
  discountPrice: number;
  discountEnd: Date;
  reviews: Array<Review>;
  image: string;
  created_at: Date;
  view: number;
  brand: TranslatableString;
  isOffer: boolean;
  sold: number;
  inStock: number;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  points: number;
  addresses: Address[];
  favorites: Product[];
  credits: number;
}

export interface Address {
  _id: string;
  city: City;
  street: string;
  details: string;
  user: User;
  phone: string;
}

export interface City {
  _id: string;
  nameAr: string;
  nameEn: string;
  shipPrice: number;
}
export type IconType =
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "FontAwesome5"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial"
  | undefined;

export interface Constant {
  key: string;
  value: string;
  _id: string;
}

export interface OrderCartItem {
  product: Product | CardProduct;
  count: number;
  product_type: number;
  const: number;
  pieceIndex?: number;
  cost: number;
  user: User;
  inCart: boolean;
  created_at: Date;
  _id: string;
}

export interface Payment {
  nameAr: string;
  nameEn: string;
  cities: string[];
  type: number;
  _id: string;
}

export interface Order {
  items: OrderCartItem[];
  user: User;
  status: number;
  shippingAddress: Address;
  arriveAt: Date;
  shippingCost: number;
  totalCost: number;
  id: number;
  paymentMethod: Payment;
  isCoupon: boolean;
  coupon?: string;
  created_at: Date;
  _id: string;
}

export enum ProductType {
  product = 1,
  card = 2,
}
