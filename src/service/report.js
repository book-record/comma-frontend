import axios from "axios";

export const getReportList = async (pageNumber, id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/report/${id}/list?page=${pageNumber}`,
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    throw new Error("독후감 리스트를 불러오지 못했습니다");
  }
};

export const createRport = async (list) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/report/new`,
      list,
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    throw new Error("독후감을 등록하지 못했습니다");
  }
};
