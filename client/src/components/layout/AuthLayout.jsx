import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Spinner from "./common/Spinner";

function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();
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

  return loading ? <p>loading</p> : <Outlet />;
}

export default AuthLayout;
