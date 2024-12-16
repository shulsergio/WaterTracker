import css from "./TodayWaterGlassList.module.css";
import MonthStatsTable from "../MonthStatsTable/MonthStatsTable";
import TodayWaterItem from "../TodayWaterItem/TodayWaterItem";
import Button from "../button/Button";
import Icon from "../Icon/Icon";

const TodayWaterGlassList = () => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Today</h2>
      <div className={css.waterList}>
        <TodayWaterItem />
        <TodayWaterItem />
        <TodayWaterItem />
        <TodayWaterItem />
        <TodayWaterItem />
      </div>
      <Button types="text" className={css.button}>
        <Icon id="icon-plus" width="16" height="16" className={css.iconPlus} />
        Add water
      </Button>
      <MonthStatsTable />
    </div>
  );
};

export default TodayWaterGlassList;
