import { useEffect, useMemo, useState } from "react";
import Icon from "../Icon/Icon.jsx";
import s from "./MonthStatsTable.module.css";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats.jsx";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectMonthWater } from "../../redux/monthWaterList/selectors.js";

const arrayOfDays = (dayOfMonth, year, month, monthWater) => {
  const days = [];
  for (let i = 1; i <= dayOfMonth; i++) {
    const newDate = new Date(year, month, i + 1).toISOString().split("T")[0];
    const find = monthWater.find(({ date }) => date.includes(newDate));

    days.push({
      id: i,
      date: new Date(year, month, i),
      consumedPercentage: find ? Math.floor(find.consumedPercentage * 100) : 0,
      numberGlasses: find ? find.numberGlasses : 0,
    });
  }
  return days;
};

const buildLinkClass = (consumedPercentage) => {
  return clsx(s.day, consumedPercentage < 100 && s.active);
};

const MonthStatsTable = () => {
  const monthWater = useSelector(selectMonthWater);

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
  }, [year, numberMonth]);

  days = arrayOfDays(dayOfMonth, year, numberMonth, monthWater);

  const handleDecrement = () => {
    setNumberMonth(numberMonth - 1);
    days = [];
  };

  const handleIncrement = () => {
    setNumberMonth(numberMonth + 1);
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
          })}, ${userMonth.toLocaleString("en-US", {
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
        {days.map(({ id, date, consumedPercentage, numberGlasses }) => (
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
                  dailyNorma={1.5}
                  consumerPercentage={consumedPercentage}
                  numberGlasses={numberGlasses}
                />
              </div>
            </button>
            <p className={s.percentage}>{consumedPercentage}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthStatsTable;
