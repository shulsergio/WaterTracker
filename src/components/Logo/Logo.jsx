import { useNavigate } from "react-router-dom";
import css from "./Logo.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Logo = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleLogoClick = () => {
    isLoggedIn ? navigate("/home") : navigate("/");
  };
  return (
    <div
      className={css.logo}
      onClick={handleLogoClick}
      aria-label="Go to Home Page"
    ></div>
  );
};

export default Logo;
