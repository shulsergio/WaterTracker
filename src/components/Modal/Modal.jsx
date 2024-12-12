import css from "./Modal.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalSlice.js";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        dispatch(closeModal());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  const handleBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      dispatch(closeModal());
    }
  };
  return (
    <div onClick={handleBackDropClick} className={css.backdrop}>
      <div className={css.modal}>
        <button
          type="button"
          aria-label="Close modal button"
          className={css.closeModalBtn}
          onClick={() => dispatch(closeModal())}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
