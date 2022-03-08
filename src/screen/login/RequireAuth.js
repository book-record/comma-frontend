import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import isLogined from "../../common/constants/AUTH";
import { checkUser } from "../../service/auth";
import { signIn } from "../../store/userSlice";

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
