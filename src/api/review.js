import axios from "axios";

export const getReview = async (reviewerId, userId, good) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/review`,
      {
        reviewerId,
        userId,
        good,
      },
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    return error;
  }
};
