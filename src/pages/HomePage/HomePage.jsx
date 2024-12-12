import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/modalSlice.js";
import Modal from "../../components/Modal/Modal.jsx";

/**
 *
 *
 * сторінка HomePage для відображення основної сторінки
 * @return {*}
 */
export default function HomePage() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  console.log("Rendered HomePage");

  return (
    <>
      <div title="Modal">
        <div>
          <button onClick={() => dispatch(openModal())} type="button">
            Modal
          </button>
        </div>
        {isModalOpen && (
          <Modal>
            <p>Компонент, що буде відображатися в модалці</p>
          </Modal>
        )}
      </div>
    </>
  );
}
