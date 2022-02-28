import { signInWithPopup } from "@firebase/auth";
import axios from "axios";

import { auth, provider } from "./firebase";

const AUTHORIZATION = "Authorization";

export const firebaseLogin = async () => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    const userInfo = { email: user.email, nickname: user.displayName };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      userInfo,
      {
        withCredentials: true,
      }
    );

    localStorage.setItem(AUTHORIZATION, data.token);
    axios.defaults.headers.common[AUTHORIZATION] =
      localStorage.getItem(AUTHORIZATION);

    return data;
  } catch (error) {
    throw new Error("로그인에 실패했습니다");
  }
};
