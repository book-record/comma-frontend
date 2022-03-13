import axios from "axios";

import { ERROR } from "../common/constants/MESSAGE";

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
    throw new Error(ERROR.NO_REPORTLIST_DATA);
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
    throw new Error(ERROR.UNKNOWN_ERROR);
  }
};

export const getReport = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/report/${id}`,
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    throw new Error(ERROR.NO_REPORT_DATA);
  }
};
