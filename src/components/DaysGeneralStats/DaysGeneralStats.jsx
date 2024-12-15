import s from "./DaysGeneralStats.module.css";

const DaysGeneralStats = ({
  day,
  month,
  dailyNorma,
  consumerPercentage,
  numberGlasses,
}) => {
  return (
    <div className={s.container}>
      <h3 className={s.title}>
        {day}, {month}
      </h3>
      <ul className={s.itemsList}>
        <li className={s.item}>
          Daily norma: <span className={s.data}>{dailyNorma} L</span>
        </li>
        <li className={s.item}>
          Fulfillment of the daily norm:
          <span className={s.data}>{consumerPercentage}</span>
        </li>
        <li className={s.item}>
          How many servings of water:
          <span className={s.data}>{numberGlasses}</span>
        </li>
      </ul>
    </div>
  );
};

export default DaysGeneralStats;
