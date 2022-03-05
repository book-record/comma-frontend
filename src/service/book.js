import axios from "axios";

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
    throw new Error("책 리스트를 불러오지 못했습니다");
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
    return error;
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
    return error;
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
    return error;
  }
};
