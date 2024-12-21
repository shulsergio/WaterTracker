import { useEffect, useState } from "react";
import styles from "./WaterRatioPanel.module.css";
import { selectDailyNorm, selectUser } from "../../redux/user/selectors";
import { useSelector } from "react-redux";
import { selectMonthWater } from "../../redux/monthWaterList/selectors";
import { selectdayWater } from "../../redux/dayWaterList/selectors";
import AddWaterModal from "../AddWaterModal/AddWaterModal.jsx";

const WaterRatioPanel = () => {
  console.log("------ WaterRatioPanel ------");
  // const dispatch = useDispatch();
  const monthWater = useSelector(selectMonthWater);
  const dayWater = useSelector(selectdayWater);
  const user = useSelector(selectUser);

  console.log("user- ", user);
  const dailyGoal = useSelector(selectDailyNorm); // Загальна норма в мл
  console.log("dailyGoal- ", dailyGoal);
  console.log("dayWater.consumedPercentage- ", dayWater.consumedPercentage);

  const [progressPercentage, setProgressPercentage] = useState();

  useEffect(() => {
    setProgressPercentage(dayWater.consumedPercentage * 100);
  }, [dayWater.consumedPercentage, monthWater, dayWater, dailyGoal]);

  console.log("monthWater- ", monthWater);
  console.log("dayWater- ", dayWater);

  // const currentWater = 1100;
  // const [currentWater, setCurrentWater] = useState(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const progressPercentage = dayWater.consumedPercentage * 100;
  const sliderPosition = `calc(${progressPercentage}% - 8px)`;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.containerProgress}>
        <h2 className={styles.title}>Today</h2>
        <div className={styles.progressTrack}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFilled}
              style={{ width: `${progressPercentage}%` }}
            />
            <div
              className={styles.progressSlider}
              style={{ left: sliderPosition }}
            ></div>
          </div>
        </div>
        <div className={styles.markersContainer}>
          <div className={styles.markerStart}>
            <div className={styles.markerLine}></div>
            <div
              className={`${styles.markerText} ${
                progressPercentage >= 0 && progressPercentage < 50
                  ? styles.markerTextActive
                  : ""
              }`}
            >
              0%
            </div>
          </div>
          <div className={styles.markerCenter}>
            <div className={styles.markerLine}></div>
            <div
              className={`${styles.markerText} ${
                progressPercentage >= 50 && progressPercentage < 100
                  ? styles.markerTextActive
                  : ""
              }`}
            >
              50%
            </div>
          </div>
          <div className={styles.markerEnd}>
            <div className={styles.markerLine}></div>
            <div
              className={`${styles.markerText} ${
                progressPercentage === 100 ? styles.markerTextActive : ""
              }`}
            >
              100%
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setIsModalOpen(true)} className={styles.addButton}>
        <span className={styles.icon}>+</span> Add Water
      </button>
      {isModalOpen && (
        <AddWaterModal
          isEdit={false}
          onClose={() => setIsModalOpen(false)}
          // onSubmit={addWater}
        />
      )}
    </div>
  );
};

export default WaterRatioPanel;
