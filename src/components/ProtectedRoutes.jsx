import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ user, redirectPath = '/login' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;