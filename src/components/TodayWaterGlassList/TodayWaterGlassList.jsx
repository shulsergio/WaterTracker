import css from "./TodayWaterGlassList.module.css";
import MonthStatsTable from "../MonthStatsTable/MonthStatsTable";
import TodayWaterItem from "../TodayWaterItem/TodayWaterItem";
import Button from "../button/Button";
import Icon from "../Icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDayWaterList } from "../../redux/dayWaterList/operations";
import AddWaterModal from "../AddWaterModal/AddWaterModal";
import { selectdayWater } from "../../redux/dayWaterList/selectors";

const TodayWaterGlassList = () => {
  const [addWater, setAddWater] = useState(false);
  const dispatch = useDispatch();
  const water = useSelector(selectdayWater);

  const handleAddWater = () => {
    setAddWater(true);
  };

  const handleCloseModal = () => {
    setAddWater(false);
  };

  useEffect(() => {
    dispatch(getDayWaterList());
  }, [dispatch]);

  const isEmpty = !water.logs || water.logs.length === 0;

  return (
    <div className={css.container}>
      <div className={css.listContainer}>
        <h2 className={css.title}>Today</h2>

        {isEmpty && (
          <Button types="text" className={css.button} onClick={handleAddWater}>
            <Icon
              id="icon-plus"
              width="16"
              height="16"
              className={css.iconPlus}
            />
            Add water
          </Button>
        )}

        <div className={css.waterList}>
          <TodayWaterItem />
        </div>
        {!isEmpty && (
          <Button types="text" className={css.button} onClick={handleAddWater}>
            <Icon
              id="icon-plus"
              width="16"
              height="16"
              className={css.iconPlus}
            />
            Add water
          </Button>
        )}
      </div>
      <MonthStatsTable />
      {addWater && <AddWaterModal onClose={handleCloseModal} />}
    </div>
  );
};

export default TodayWaterGlassList;
