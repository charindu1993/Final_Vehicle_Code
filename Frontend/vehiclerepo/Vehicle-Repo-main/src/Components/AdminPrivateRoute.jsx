import { Outlet, Navigate } from "react-router-dom";

const AdminPrivateRoute = () => {
  const auth = {
    token: localStorage.getItem("isAdminLoggedIn")
      ? localStorage.getItem("isAdminLoggedIn")
      : 0,
  };

  return auth.token ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminPrivateRoute;
