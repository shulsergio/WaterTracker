import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater";
import WaterСonsumptionTracker from "../../components/WaterСonsumptionTracker/WaterСonsumptionTracker";
import css from "./WelcomePage.module.css";
import TodayWaterGlassList from "../../components/TodayWaterGlassList/TodayWaterGlassList";
export default function WelcomePage() {
  console.log("Rendered WelcomePage");
  return (
    <div className={css.layer}>
      <section className={css.section}>
        <div className={css.wrapper}>
          <div className={css.containerWater}>
            <WaterСonsumptionTracker />
          </div>
          <div className={css.containerWhy}>
            <WhyDrinkWater />
          </div>
          <div>
            <TodayWaterGlassList />
          </div>
        </div>
      </section>
    </div>
  );
}
