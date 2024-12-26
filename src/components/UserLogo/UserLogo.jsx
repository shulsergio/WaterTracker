import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import css from "./UserLogo.module.css";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import Icon from "../Icon/Icon";
import { selectUser } from "../../redux/user/selectors.js";

const UserLogo = () => {
  const user = useSelector(selectUser) || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const cutText = (text, maxLength = 14) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsModalOpen]);

  const getAvatar = () => {
    if (user.avatarUrl && user.avatarUrl !== "null") {
      return (
        <img
          src={user.avatarUrl}
          alt={cutText(user.name || "User")}
          className={css.avatar}
        />
      );
    }

    if (user.name && user.name.length > 0) {
      return (
        <span className={css.emptyAvatar}>{user.name[0].toUpperCase()}</span>
      );
    }

    if (user.email && user.email.length > 0) {
      return (
        <span className={css.emptyAvatar}>{user.email[0].toUpperCase()}</span>
      );
    }
    return <span className={css.emptyAvatar}>?</span>;
  };

  return (
    <div ref={modalRef} className={css.userLogoContainer}>
      <button onClick={toggleModal} className={css.userLogoBtn}>
        <span className={css.userName}>
          {cutText(user.name || user.email || "", 10)}
        </span>
        {getAvatar()}
        <Icon
          id="icon-down"
          width={16}
          height={16}
          className={`${isModalOpen ? css.iconRotate : ""} icon-blue`}
        />
      </button>
      {isModalOpen && <UserLogoModal toggleModal={toggleModal} />}
    </div>
  );
};
export default UserLogo;
