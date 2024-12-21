import { useSelector } from "react-redux";
import css from "./Header.module.css";
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";
import { useEffect, useState } from "react";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Получение текущей темы из localStorage
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkTheme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Применение темы при изменении
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
    // <div className={css.headerContainer}>
    <header className={css.header}>
      <Logo />
      <button className={css.themeToggle} onClick={toggleTheme}>
        {isDarkTheme ? "Light Mode" : "Dark Mode"}
      </button>
      {isLoggedIn ? <UserLogo /> : <UserAuth />}
    </header>
    // </div>
  );
};
export default Header;
