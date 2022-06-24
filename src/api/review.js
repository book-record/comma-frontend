import axios from "axios";

import { ERROR } from "../common/constants/MESSAGE";

export const updateReview = async (reviewerId, userId, good) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/review`,
      {
        reviewerId,
        userId,
        good,
      }
    );

    return data;
  } catch (error) {
    throw new Error(ERROR.UNKNOWN_ERROR);
  }
};
