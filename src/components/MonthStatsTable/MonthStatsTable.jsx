import { useEffect, useMemo, useState } from "react";
import Icon from "../Icon/Icon.jsx";
import s from "./MonthStatsTable.module.css";

const arrayOfDays = (dayOfMonth, year, month) => {
  const days = [];
  for (let i = 1; i <= dayOfMonth; i++) {
    days.push({
      id: i,
      date: new Date(year, month, i),
      consumedPercentage: "0%",
      numberGlasses: 0,
    });
  }
  return days;
};

const MonthStatsTable = () => {
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

  days = arrayOfDays(dayOfMonth, year, numberMonth);

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
            <Icon id="icon-left-arrow" className={s.icon} />
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
            <Icon id="icon-right-arrow" className={s.icon} />
          </button>
        </div>
      </div>
      <ul className={s.dayList}>
        {days.map(({ id, date, consumedPercentage }) => (
          <li key={id} className={s.dayItem}>
            <button
              type="button"
              className={s.day}
              disabled={date >= presentDay}>
              {date.getDate()}
            </button>
            <p className={s.percentage}>{consumedPercentage}</p>
            <div className={s.dayAction}>DaysGeneralStats</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthStatsTable;
