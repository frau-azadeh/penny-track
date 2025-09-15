import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { RootState } from "../store/store";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
