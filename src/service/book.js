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
