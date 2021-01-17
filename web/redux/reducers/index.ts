import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducers";
import floatCartReducer from "./floatCart.reducer";
import ProfileReducer from "./ProfileReducer";

export default combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  floatCart: floatCartReducer,
  profile: ProfileReducer,
});
