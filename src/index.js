import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Routes } from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
