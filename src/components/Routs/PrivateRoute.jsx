import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export const PrivateRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log("isLoggedIn in PrivateRoute: ", isLoggedIn);
  console.log("component in PrivateRoute: ", component);
  console.log("redirectTo in PrivateRoute: ", redirectTo);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};
