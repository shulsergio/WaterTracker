import Modal from "../Modal/Modal";
import Button from "../button/Button";
import styles from "./DeleteEntryModal.module.css";

const DeleteEntryModal = ({ onClose }) => {
  const clickDelete = () => {};
  return (
    <Modal
      title="Delete entry"
      text="Are you sure you want to delete the entry?"
      classNameModal={styles.modal}
      onClose={onClose}
      actionBtns={
        <>
          <Button types="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button types="warning" onClick={clickDelete}>
            Delete
          </Button>
        </>
      }
    />
  );
};

export default DeleteEntryModal;
