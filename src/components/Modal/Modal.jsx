import React from "react";
import css from "./Modal.module.css";
import { useState } from "react";

const Modal = ({ onCloseModal }) => {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button
          type="button"
          aria-label="Close modal button"
          className={css.closeModalBtn}
          onClick={onCloseModal}
        >
          &times;
        </button>

        <h3 className={css.title}>Modal</h3>
        <p className={css.text}>Тут будуть компоненти різних модалок</p>
      </div>
    </div>
  );
};

export default Modal;
