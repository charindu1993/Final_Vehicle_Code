import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = {
    token: localStorage.getItem("isLoggedIn")
      ? localStorage.getItem("isLoggedIn")
      : 0,
  };

  return auth.token ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoutes;
