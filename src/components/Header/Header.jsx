import { useSelector } from "react-redux";
import css from "./Header.module.css";
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkTheme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkTheme ? "dark" : "light"
    );
    localStorage.setItem("isDarkTheme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <header className={css.header}>
      <span className={css.boxItem}>
        <Logo />

        {isLoggedIn ? <UserLogo /> : <UserAuth />}
      </span>
      <span>
        <button className={css.themeToggle} onClick={toggleTheme}>
          {isDarkTheme ? (
            <FaSun size={36} color="gold" />
          ) : (
            <FaMoon size={36} color="silver" />
          )}
        </button>
      </span>
    </header>
  );
};
export default Header;
