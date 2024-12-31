import Modal from "../Modal/Modal";
import Button from "../button/Button";

const DeleteEntryModal = ({ onClose, onDelete }) => {
  const clickDelete = () => {
    onDelete();
  };

  return (
    <Modal
      title="Delete entry"
      text="Are you sure you want to delete the entry?"
      onClose={onClose}
      actionBtns={
        <>
          <Button types="warning" onClick={clickDelete}>
            Delete
          </Button>
          <Button types="secondary" onClick={onClose}>
            Cancel
          </Button>
        </>
      }
    />
  );
};

export default DeleteEntryModal;
