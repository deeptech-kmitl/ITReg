import { Navigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

const ProtectAuthenRoute = ({
    children,
  }) => {
    const { user } = UserAuth();
    console.log(user)
    if (user) {
      return <Navigate to={"/dashboard"} replace />;
    }
    return children ? children : <Outlet />;
};

export default ProtectAuthenRoute;