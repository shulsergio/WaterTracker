import clsx from 'clsx';
import Icon from '../Icon/Icon';
import css from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({ children, title, onClose, classNameModal }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div onClick={handleBackDropClick} className={css.backdrop}>
      <div className={clsx(css.modal, classNameModal)}>
        <div className={css.modalHeder}>
          <h3 className={css.title}>{title}</h3>
          <button
            type='button'
            aria-label='Close modal button'
            className={css.closeModalBtn}
            onClick={onClose}
          >
            <Icon id='icon-close' width={14} height={14} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
