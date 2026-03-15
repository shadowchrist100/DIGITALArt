import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthComponent = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        <span className="ml-3" style={{ color: '#2b2d42' }}>Vérification de la session...</span>
      </div>
    );
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthComponent;