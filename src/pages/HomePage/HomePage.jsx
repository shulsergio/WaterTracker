// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import DailyNorma from "../../components/DailyNorma/DailyNorma.jsx";
import TodayWaterGlassList from "../../components/TodayWaterGlassList/TodayWaterGlassList.jsx";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel.jsx";
// import useModal from "../../hooks/useModal.js";
import css from "./HomePage.module.css";
import { selectDailyNorm } from "../../redux/user/selectors.js";
import { useEffect } from "react";
import { fetchUser } from "../../redux/user/operations.js";
import { getDayWaterList } from "../../redux/dayWaterList/operations.js";
import { getMonthWaterList } from "../../redux/monthWaterList/operations.js";
import { selectdayWater } from "../../redux/dayWaterList/selectors.js";
// import { selectUser } from "../../redux/user/selectors.js";
// import UserLogoutModal from "../../components/UserLogoutModal/UserLogoutModal.jsx";
/**
 *
 *
 * сторінка HomePage для відображення основної сторінки
 * @return {*}
 */
export default function HomePage() {
  const dispatch = useDispatch();
  const DailyNorm = useSelector(selectDailyNorm);
  const dayAddGlass = useSelector(selectdayWater);
  useEffect(() => {
    if (!DailyNorm || !dayAddGlass) {
      dispatch(fetchUser());
      const today = new Date().toISOString().split("T")[0];
      dispatch(getDayWaterList(today));
      dispatch(getMonthWaterList(today));
      console.log("%%%% data upload %%%% and data- ", today);
    }
  }, [DailyNorm, dayAddGlass, dispatch]);

  console.log("Rendered HomePage");
  return (
    <section className={css.section}>
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
