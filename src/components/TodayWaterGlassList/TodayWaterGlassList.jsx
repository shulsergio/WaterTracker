import css from "./TodayWaterGlassList.module.css";
import MonthStatsTable from "../MonthStatsTable/MonthStatsTable";
import TodayWaterItem from "../TodayWaterItem/TodayWaterItem";
import Button from "../button/Button";
import Loader from "../Loader/Loader";
import Icon from "../Icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { selectdayWater } from "../../redux/dayWaterList/selectors";
import { useEffect } from "react";
import { getDayWaterList } from "../../redux/dayWaterList/operations";

const TodayWaterGlassList = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectdayWater);

  useEffect(() => {
    dispatch(getDayWaterList());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Today</h2>
      <div className={css.waterList}>
        <TodayWaterItem />
        {/* {data.length > 0 && <TodayWaterItem />} */}
        {/* <TodayWaterItem data={data} /> */}
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
