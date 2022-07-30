import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../redux/features/user/userAction";
import Spinner from "../common/Spinner";
function AppLayout() {
  const { userToken, isLoading, success, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // automatically authenticate user if token is found
  useEffect(() => {
    // redirect user to login page if registration was successful
    if (!success || !user) {
      navigate("/login");
      console.log("not success");
    }

    // redirect authenticated user to profile screen
  }, [user, success]);
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  return (
    <div className=" w-screen h-screen  bg-lightbg flex justify-center items-center">
      {isLoading ? (
        <div className="  flex justify-center items-center p-5 bg-white rounded-lg shadow-sm">
          {/* <Spinner spinnerColor="#83D300" /> */}
          <Spinner />
        </div>
      ) : (
        <div className=" px-12 py-16 bg-white rounded-lg shadow-sm">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default AppLayout;
