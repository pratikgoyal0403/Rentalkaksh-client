import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import AppReducer from "./store/reducers/appReducer";
import AdminAuthReducer from "./store/reducers/adminAuthReducer";
import UserReducer from "./store/reducers/userReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  admin: AdminAuthReducer,
  app: AppReducer,
  user: UserReducer,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
