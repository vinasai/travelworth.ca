import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useGlobalContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
