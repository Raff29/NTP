import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../components/context/AuthContext";
import { useContext } from "react";

const PrivateRoutes = () => {
  const auth = useContext(AuthContext);
  return auth?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
