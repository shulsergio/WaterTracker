import { useSelector } from "react-redux";
import css from "./Header.module.css";
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.headerContainer}>
    <header className={css.header}>
      <Logo />
        {isLoggedIn ? <UserLogo /> : <UserAuth className={css.headerButton} />}
    </header>
    </div>
  );
};
export default Header;
