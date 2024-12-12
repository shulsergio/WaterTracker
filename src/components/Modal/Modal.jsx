import { useEffect } from "react";
import css from "./Modal.module.css";

const Modal = ({ onCloseModal, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseModal]);

  const handleBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };
  return (
    <div onClick={handleBackDropClick} className={css.backdrop}>
      <div className={css.modal}>
        <button
          type="button"
          aria-label="Close modal button"
          className={css.closeModalBtn}
          onClick={onCloseModal}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
