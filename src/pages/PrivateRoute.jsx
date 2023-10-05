import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.user);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};
export default PrivateRoute;
