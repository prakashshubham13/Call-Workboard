import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import invoiceReducer from "./cake/Cakereducer";

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  invoiceReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
