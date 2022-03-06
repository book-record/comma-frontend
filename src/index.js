import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyle from "./common/compnents/style/GlobalStyle";
import Book from "./screen/book/Book";
import BookPages from "./screen/bookPages/Bookpages";
import Login from "./screen/login/Login";
import Main from "./screen/main/Main";
import ReportPages from "./screen/reportPages/ReportPages";
import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/bookList" element={<BookPages />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/reportList/:id" element={<ReportPages />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
