import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import Button from "../button/Button";
import styles from "./UserLogoutModal.module.css";
import { logOut } from "../../redux/auth/operations.js";

const UserLogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const clickLogOut = () => {
    dispatch(logOut());
  };
  return (
    <Modal
      title="Log out"
      text="Do you really want to leave?"
      classNameModal={styles.modal}
      onClose={onClose}
      actionBtns={
        <>
          <Button type="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="warning" onClick={clickLogOut}>
            Log out
          </Button>
        </>
      }
    />
  );
};

export default UserLogoutModal;
