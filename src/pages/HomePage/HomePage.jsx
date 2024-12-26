import DailyNorma from "../../components/DailyNorma/DailyNorma.jsx";
import TodayWaterGlassList from "../../components/TodayWaterGlassList/TodayWaterGlassList.jsx";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel.jsx";
import css from "./HomePage.module.css";
/**
 *
 *
 * сторінка HomePage для відображення основної сторінки
 * @return {*}
 */
export default function HomePage() {
  return (
    <div className={css.layer}>
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
    </div>
  );
}
