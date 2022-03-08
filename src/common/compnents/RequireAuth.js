import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { checkUser } from "../../api/auth";
import { signIn } from "../../store/userSlice";
import isLogined from "../constants/AUTH";

function RequireAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const findUser = async () => {
      try {
        const data = await checkUser();

        dispatch(signIn(data));
      } catch (error) {
        throw new Error("유저 정보가 없습니다");
      }
    };

    findUser();
  }, [dispatch]);

  if (!isLogined()) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default RequireAuth;
