import axios from "axios";

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: process.env.REACT_APP_KAKAO_BOOK_SEARCH_API,
  },
});

export const bookSearch = (params) =>
  Kakao.get("/v3/search/book?target=title", { params });
