import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyle from "./common/compnents/style/GlobalStyle";
import Book from "./screen/book/Book";
import BookPages from "./screen/bookPages/BookPages";
import Login from "./screen/login/Login";
import RequireAuth from "./screen/login/RequireAuth";
import Main from "./screen/main/Main";
import Report from "./screen/report/Report";
import ReportPages from "./screen/reportPages/ReportPages";
import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Main />} />
            <Route path="/bookList" element={<BookPages />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/reportList/:userId" element={<ReportPages />} />
            <Route path="/report/:id" element={<Report />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
