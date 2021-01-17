import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import reduxThunk from "redux-thunk";

export default (initialState = undefined) => {
  // the name on the exposed store variable
  return createStore(reducer, initialState, applyMiddleware(reduxThunk));
};
