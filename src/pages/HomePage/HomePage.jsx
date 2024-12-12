import Modal from '../../components/Modal/Modal.jsx';
import useModal from '../../hooks/useModal.js';

/**
 *
 *
 * сторінка HomePage для відображення основної сторінки
 * @return {*}
 */
export default function HomePage() {
  const { openModal, isOpen, closeModal } = useModal();

  console.log('Rendered HomePage');

  return (
    <>
      <div title='Modal'>
        <div>
          <button onClick={openModal} type='button'>
            Modal
          </button>
        </div>
        {isOpen && (
          <Modal title='Delete entry' onClose={closeModal}>
            <p>Компонент, що буде відображатися в модалці</p>
          </Modal>
        )}
      </div>
    </>
  );
}
