import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ProtectedRoute = ({ requiredRole }: { requiredRole: "admin" | "user" }) => {
  const { isAuthenticated, currentUser } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (currentUser?.role !== requiredRole) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
