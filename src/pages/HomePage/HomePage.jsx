import DailyNorma from "../../components/DailyNorma/DailyNorma.jsx";
import TodayWaterGlassList from "../../components/TodayWaterGlassList/TodayWaterGlassList.jsx";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel.jsx";
// import useModal from "../../hooks/useModal.js";
import css from "./HomePage.module.css";
// import UserLogoutModal from "../../components/UserLogoutModal/UserLogoutModal.jsx";
/**
 *
 *
 * сторінка HomePage для відображення основної сторінки
 * @return {*}
 */
export default function HomePage() {
  // const { openModal, isOpen, closeModal } = useModal();

  console.log("Rendered HomePage");

  return (
    <section className={css.section}>
      {/* <div className={css.bottleWrap}> */}
      {/* <div className={css.bottle}> */}
      <div className={css.wrap}>
        <div className={css.norma}>
          <DailyNorma />
        </div>
        <div className={css.image} />
        <div className={css.WaterRatioPanel}>
          <WaterRatioPanel />
        </div>
      </div>
      <div className={css.todayWaterGlassList}>
        <TodayWaterGlassList />
      </div>
    </section>
  );
}
