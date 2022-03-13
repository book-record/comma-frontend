import axios from "axios";

import { ERROR } from "../common/constants/MESSAGE";

export const getBookList = async (pageNumber) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/book/list?page=${pageNumber}`,
      {
        withCredentials: true,
      }
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
      list,
      {
        withCredentials: true,
      }
    );

    return data.result;
  } catch (error) {
    throw new Error(ERROR.UNKNOWN_ERROR);
  }
};

export const getBook = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/book/${id}`,
      {
        withCredentials: true,
      }
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
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    throw new Error(ERROR.NO_AUDIO_DATA);
  }
};
