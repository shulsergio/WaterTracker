import { useEffect, useMemo, useState } from "react";
import Icon from "../Icon/Icon.jsx";
import s from "./MonthStatsTable.module.css";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats.jsx";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectMonthWater } from "../../redux/monthWaterList/selectors.js";
import { getMonthWaterList } from "../../redux/monthWaterList/operations.js";
import { selectDailyNorm, selectUser } from "../../redux/user/selectors.js";
import { selectdayWater } from "../../redux/dayWaterList/selectors.js";

const newDayString = (year, month, day) => {
  return new Date(year, month, day + 1).toISOString().split("T")[0];
};

const arrayOfDays = (dayOfMonth, year, month, monthWater, dailyNorma) => {
  const daysArray = [];
  for (let i = 1; i <= dayOfMonth; i++) {
    const newDate = newDayString(year, month, i);
    const find = monthWater.find(({ date }) => date.includes(newDate));

    daysArray.push({
      id: i,
      date: new Date(year, month, i),
      dailyNorma: Math.floor(dailyNorma / 100) / 10,
      consumedPercentage: find ? Math.floor(find.consumedPercentage * 100) : 0,
      numberGlasses: find ? find.numberGlasses : 0,
    });
  }

  return daysArray;
};

const buildLinkClass = (consumedPercentage) => {
  return clsx(s.day, consumedPercentage < 100 && s.active);
};

const MonthStatsTable = () => {
  const dispatch = useDispatch();
  const monthWater = useSelector(selectMonthWater);
  const user = useSelector(selectUser);
  const dailyNorma = useSelector(selectDailyNorm);
  const dayWater = useSelector(selectdayWater);

  const [isDisabled, setIsDisabled] = useState(true);

  const presentDay = new Date();

  let [month, year] = [presentDay.getMonth(), presentDay.getFullYear()];

  const newPresentDay = useMemo(() => {
    return new Date(year, month);
  }, [year, month]);

  const [userMonth, setUserMonth] = useState(newPresentDay);
  const [numberMonth, setNumberMonth] = useState(month);

  let days = [];

  const dayOfMonth = new Date(year, numberMonth + 1, 0).getDate();

  useEffect(() => {
    if (userMonth >= newPresentDay) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [userMonth, newPresentDay]);

  useEffect(() => {
    setUserMonth(new Date(year, numberMonth));
  }, [numberMonth, year]);

  useEffect(() => {
    dispatch(getMonthWaterList(newDayString(year, numberMonth, 1)));
  }, [dispatch, numberMonth, year, dailyNorma, dayWater]);

  days = arrayOfDays(dayOfMonth, year, numberMonth, monthWater, user.dailyNorm);

  const handleDecrement = () => {
    setNumberMonth((prevNumberMonth) => prevNumberMonth - 1);

    days = [];
  };

  const handleIncrement = () => {
    setNumberMonth((prevNumberMonth) => prevNumberMonth + 1);
    days = [];
  };

  return (
    <div>
      <div className={s.calendarHeader}>
        <h2 className={s.calendarTitle}>Month</h2>
        <div className={s.calendarPagination}>
          <button
            type="button"
            className={s.calendarButton}
            onClick={handleDecrement}>
            <Icon
              id="icon-left-arrow"
              className={s.icon}
              width="14"
              height="14"
            />
          </button>
          <p className={s.calendarDate}>{`${userMonth.toLocaleString("en-US", {
            month: "long",
          })}, ${userMonth.toLocaleString("default", {
            year: "numeric",
          })}`}</p>
          <button
            type="button"
            className={s.calendarButton}
            onClick={handleIncrement}
            disabled={isDisabled}>
            <Icon
              id="icon-right-arrow"
              className={s.icon}
              width="14"
              height="14"
            />
          </button>
        </div>
      </div>
      <ul className={s.dayList}>
        {days.map(
          ({ id, date, consumedPercentage, numberGlasses, dailyNorma }) => (
            <li key={id} className={s.dayItem}>
              <button
                type="button"
                className={buildLinkClass(consumedPercentage)}
                disabled={date >= presentDay}>
                {date.getDate()}
                <div className={s.dayAction}>
                  <DaysGeneralStats
                    day={date.getDate()}
                    month={date.toLocaleString("en-US", {
                      month: "long",
                    })}
                    dailyNorma={dailyNorma}
                    consumerPercentage={consumedPercentage}
                    numberGlasses={numberGlasses}
                  />
                </div>
              </button>
              <p className={s.percentage}>{consumedPercentage}%</p>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default MonthStatsTable;
