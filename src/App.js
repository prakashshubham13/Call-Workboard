import React from "react";
import { Provider } from "react-redux";
import Home from "./web/screens/Home.js";
import store from "./web/common/reducers/Store";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}
