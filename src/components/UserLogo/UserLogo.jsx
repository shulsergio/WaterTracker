import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import css from "./UserLogo.module.css";
// import UserLogoModal from '../UserLogoModal/UserLogoModal';
import Icon from "../Icon/Icon";
import { selectUser } from "../../redux/user/selectors.js";

const UserLogo = () => {
  const proverkaUser = useSelector(selectUser);
  const user = useSelector(selectUser) || {}; // *********** ПРОВЕРКАААА ***********
  console.log("--- proverkaUser from UserLogo", proverkaUser);
  console.log("--- USER from UserLogo", user);
  console.log("--- user.avatarUrl from UserLogo", user.avatarUrl);
  console.log("--- user.name from UserLogo", user.name);
  console.log("--- user.name[0] from UserLogo", user.name[0]);
  console.log("--- user.email[0] from UserLogo", user.email[0]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

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
    if (user.avatarUrl) {
      return (
        <img src={user.avatarUrl} alt={user.name} className={css.avatar} />
      );
    }
    if (user.name) {
      return (
        <span className={css.emptyAvatar}>{user.name[0].toUpperCase()}</span>
      );
    }
    if (user.email) {
      return (
        <span className={css.emptyAvatar}>{user.email[0].toUpperCase()}</span>
      );
    }
  };
  return (
    <div ref={modalRef} className={css.userLogoContainer}>
      <button
        // onClick={toggleModal}
        className={css.userLogoBtn}
      >
        <span className={css.userName}>{user.name || user.email}</span>
        {getAvatar()}
        <Icon
          id="icon-down"
          width={16}
          height={16}
          className={`${isModalOpen ? css.iconRotate : ""} icon-blue`}
        />
      </button>
      {/* {isModalOpen && <UserLogoModal toggleModal={toggleModal} />} */}
    </div>
  );
};
export default UserLogo;
