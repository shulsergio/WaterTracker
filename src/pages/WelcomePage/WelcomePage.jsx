import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater";
import WaterСonsumptionTracker from "../../components/WaterСonsumptionTracker/WaterСonsumptionTracker";
import css from "./WelcomePage.module.css";
export default function WelcomePage() {
  console.log("Rendered WelcomePage");
  return (
    <ul className={css.list}>
      <div className={css.wrapper}>
        <div className={css.container}>
          <li>
            <WaterСonsumptionTracker />
          </li>
        </div>
        <div>
          <li>
            <WhyDrinkWater />
          </li>
        </div>
      </div>
    </ul>
  );
}
