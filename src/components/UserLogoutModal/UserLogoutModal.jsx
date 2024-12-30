import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import Button from "../button/Button";
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
      onClose={onClose}
      actionBtns={
        <>
          <Button types="warning" onClick={clickLogOut}>
            Log out
          </Button>

          <Button types="secondary" onClick={onClose}>
            Cancel
          </Button>
        </>
      }
    />
  );
};

export default UserLogoutModal;
