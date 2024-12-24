import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater";
import WaterСonsumptionTracker from "../../components/WaterСonsumptionTracker/WaterСonsumptionTracker";
import css from "./WelcomePage.module.css";
import BackgroundSVG from "../../components/BackgroundSVG/backgroundSVG.jsx";

export default function WelcomePage() {
  console.log("Rendered WelcomePage");
  return (
    <div>
{/*       <BackgroundSVG /> */}
      <div className={css.background}>
        <div className={css.layer}>
          <section className={css.section}>
            <div className={css.wrapper}>
              <div className={css.containerWater}>
                <WaterСonsumptionTracker />
              </div>
              <div className={css.containerWhy}>
                <WhyDrinkWater />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


/* import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater";
import WaterСonsumptionTracker from "../../components/WaterСonsumptionTracker/WaterСonsumptionTracker";
import css from "./WelcomePage.module.css";
export default function WelcomePage() {
  console.log("Rendered WelcomePage");
  return (
    // <div className={css.layer}>
    <section className={css.section}>
      <div className={css.wrapper}>
        <div className={css.containerWater}>
          <WaterСonsumptionTracker />
        </div>
        <div className={css.containerWhy}>
          <WhyDrinkWater />
        </div>
      </div>
    </section>
    // </div>
  );
}
 */