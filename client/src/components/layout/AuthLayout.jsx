import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Spinner from "./common/Spinner";

function AuthLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  //check authentication
  const checkAuth = async () => {
    const isAuth = await authUtils.isAuthenticated();
    if (!isAuth) {
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [navigate]);

  return (
    <div className=" w-screen h-screen  bg-lightbg flex justify-center items-center">
      {loading ? (
        <div className="  flex justify-center items-center p-5 bg-white rounded-lg shadow-sm">
          {/* <Spinner spinnerColor="#83D300" /> */}
          Loading
        </div>
      ) : (
        <div className=" px-12 py-16 bg-white rounded-lg shadow-sm">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default AuthLayout;
