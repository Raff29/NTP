import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext);

  if (auth?.isLoading) return null;

  return auth?.isAuthenticated ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default PublicRoutes;
