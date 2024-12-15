import DailyNorma from "../../components/DailyNorma/DailyNorma.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import useModal from "../../hooks/useModal.js";
// import UserLogoutModal from "../../components/UserLogoutModal/UserLogoutModal.jsx";
/**
 *
 *
 * сторінка HomePage для відображення основної сторінки
 * @return {*}
 */
export default function HomePage() {
  const { openModal, isOpen, closeModal } = useModal();

  console.log("Rendered HomePage");

  return (
    <>
      <DailyNorma />

      <p>пример модалки</p>
      <div title="Modal">
        <div>
          <button onClick={openModal} type="button">
            Modal
          </button>
        </div>
        {isOpen && (
          <Modal title="Delete entry" onClose={closeModal}>
            <p>Компонент, що буде відображатися в модалці</p>
          </Modal>
        )}
      </div>
      {/* <UserLogoutModal /> */}
    </>
  );
}
