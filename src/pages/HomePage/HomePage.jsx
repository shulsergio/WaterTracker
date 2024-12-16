import DailyNorma from "../../components/DailyNorma/DailyNorma.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import useModal from "../../hooks/useModal.js";
import css from "./HomePage.module.css";
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
    <section className={css.section}>
      <DailyNorma />

      {/* Блок с бутылкой и WaterRatioPanel */}
      <div className={css.bottleWrap}>
        <div className={css.bottle}></div>
        <WaterRatioPanel />
      </div>

      {/* Пример модального окна */}
      <p>Пример модалки</p>
      <div title="Modal">
        <div>
          <button onClick={openModal} type="button">
            Modal
          </button>
        </div>
        {isOpen && (
          <Modal title="Delete entry" onClose={closeModal}>
            <p>Компонент, что будет отображаться в модалке</p>
          </Modal>
        )}
      </div>

      {/* Здесь может быть UserLogoutModal */}
      {/* <UserLogoutModal /> */}

      {/* Список стаканов воды за сегодня */}
      <TodayWaterGlassList />
    </section>
  );
}