import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const auth = useAuth();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return auth?.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoutes;
