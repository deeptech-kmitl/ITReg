import { Navigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";
const ProtectedRoute = ({
    redirectPath,
    children,
  }) => {
    const { user } = UserAuth();
    const { role } = UserAuth();
    
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
};

export default ProtectedRoute;