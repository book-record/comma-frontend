import axios from "axios";

import { ERROR } from "../common/constants/MESSAGE";

export const getBookList = async (pageNumber) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/book/list?page=${pageNumber}`
    );
    return data;
  } catch (error) {
    throw new Error(ERROR.NO_BOOKLIST_DATA);
  }
};

export const createBook = async (list) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/book/new`,
      list
    );

    return data.result;
  } catch (error) {
    throw new Error(ERROR.UNKNOWN_ERROR);
  }
};
// 책 API 관련은 백엔드가 나을 것 같다.

export const getBook = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/book/${id}`
    );

    return data;
  } catch (error) {
    throw new Error(ERROR.NO_BOOK_DATA);
  }
};

export const createReview = async (id, userId, formData) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/book/${id}/${userId}`,
      formData,
      {
        header: { "content-type": "multipart/form-data" },
      }
    );

    return data;
  } catch (error) {
    throw new Error(ERROR.NO_AUDIO_DATA);
  }
};
