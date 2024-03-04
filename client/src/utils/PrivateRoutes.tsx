import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext);

  return auth?.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoutes;
