import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

export const RestrictedRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log("isLoggedIn in RestrictedRoute: ", isLoggedIn);
  console.log("redirectTo in RestrictedRoute: ", redirectTo);
  console.log("component in RestrictedRoute: ", component);

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};
