import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const value = localStorage.getItem("pmoUser");

  if (!value) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
