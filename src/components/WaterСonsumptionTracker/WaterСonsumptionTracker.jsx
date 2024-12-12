import Button from "../button/Button.jsx";
import Icon from "../Icon/Icon.jsx";
import css from "./WaterСonsumptionTracker.module.css";

const WaterСonsumptionTracker = () => {
  return (
    <div className={css.container}>
      <div className={css.headers}>
        <h1 className={css.title}>Water consumption tracker</h1>
        <h2 className={css.sub__title}>Record daily water intake and track</h2>
      </div>
      <div className={css.benefits}>
        <h3 className={css.benefits__title}>Tracker Benefits:</h3>
        <ul className={css.list}>
          <li className={css.item}>
            <Icon id="icon-calendar" className={css.icon} />
            Habit drive
          </li>
          <li className={css.item}>
            <Icon id="icon-outline" className={css.icon} />
            View statistics
          </li>
          <li className={css.item}>
            <Icon id="icon-tools" className={css.icon} />
            Personal rate setting
          </li>
        </ul>
      </div>
      <Button className={css.button}>Try tracker</Button>
    </div>
  );
};

export default WaterСonsumptionTracker;
