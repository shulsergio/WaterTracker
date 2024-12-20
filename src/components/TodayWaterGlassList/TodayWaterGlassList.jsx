import css from "./TodayWaterGlassList.module.css";
import MonthStatsTable from "../MonthStatsTable/MonthStatsTable";
import TodayWaterItem from "../TodayWaterItem/TodayWaterItem";
import Button from "../button/Button";
import Icon from "../Icon/Icon";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDayWaterList } from "../../redux/dayWaterList/operations";

const TodayWaterGlassList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDayWaterList());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <div className={css.listContainer}>
        <h2 className={css.title}>Today</h2>
        <div className={css.waterList}>
          <TodayWaterItem />
        </div>
        <Button types="text" className={css.button}>
          <Icon
            id="icon-plus"
            width="16"
            height="16"
            className={css.iconPlus}
          />
          Add water
        </Button>
      </div>
      <MonthStatsTable />
    </div>
  );
};

export default TodayWaterGlassList;
