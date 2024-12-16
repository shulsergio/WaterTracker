import { useState, useEffect, useCallback } from "react";
import css from "./UserLogoModal.module.css";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
import Icon from "../Icon/Icon";
// import SettingModal from '../SettingModal/SettingModal';

const UserLogoModal = ({ toggleModal }) => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openSettingModal = () => {
    setIsLogoutModalOpen(false);
    setIsSettingModalOpen(true);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeAllModals = useCallback(() => {
    setIsSettingModalOpen(false);
    setIsLogoutModalOpen(false);
    toggleModal();
  }, [toggleModal]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.code === "Escape") {
        closeAllModals();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeAllModals]);

  return (
    <>
      {!isSettingModalOpen && !isLogoutModalOpen && (
        <div className={css.container}>
          <div
            className={css.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <button onClick={openSettingModal} className={css.button}>
              <Icon
                id="icon-settings"
                width={16}
                height={16}
                className={css.icon}
              />
              <span className={css.btnName}>Settings</span>
            </button>
            <button onClick={openLogoutModal} className={css.button}>
              <Icon
                id="icon-arrow-right"
                width={16}
                height={16}
                className={css.icon}
              />
              <span className={css.btnName}>Log out</span>
            </button>
          </div>
        </div>
      )}
      {/* {isSettingModalOpen && (
        <SettingModal
          onClose={() => {
            setIsSettingModalOpen(false);
            closeAllModals();
          }}
          isShow={isSettingModalOpen}
        />
      )} */}
      {isLogoutModalOpen && (
        <UserLogoutModal
          isShow={isLogoutModalOpen}
          onClose={() => {
            setIsLogoutModalOpen(false);
            closeAllModals();
          }}
          toggleModal={closeAllModals}
        />
      )}
    </>
  );
};
export default UserLogoModal