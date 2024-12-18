import { useState } from "react";
import styles from "./WaterRatioPanel.module.css";
import AmountWaterModal from "../AmountWaterModal/AmountWaterModal";
import { selectUser } from "../../redux/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectMonthWater } from "../../redux/monthWaterList/selectors";
import { selectdayWater } from "../../redux/dayWaterList/selectors";

const WaterRatioPanel = () => {
  console.log("------ WaterRatioPanel ------");
  const dispatch = useDispatch();
  const monthWater = useSelector(selectMonthWater);
  const dayWater = useSelector(selectdayWater);
  console.log("monthWater- ", monthWater);
  console.log("dayWater- ", dayWater);
  const user = useSelector(selectUser);
  console.log("user- ", user);
  const dailyGoal = user.dailyNorm; // Загальна норма в мл
  console.log("dailyGoal- ", dailyGoal);
  console.log("dayWater.consumedPercentage- ", dayWater.consumedPercentage);

  // const currentWater = 1100;
  // const [currentWater, setCurrentWater] = useState(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   // Обновляем состояние currentWater при загрузке страницы
  //   setCurrentWater((prev) => Math.min(prev, dailyGoal));
  // }, [dailyGoal]);

  // const addWater = (amount) => {
  //   setCurrentWater((prev) => Math.min(prev + amount, dailyGoal));
  // };

  const progressPercentage = dayWater.consumedPercentage * 100;
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
        <AmountWaterModal
          isEdit={false}
          onClose={() => setIsModalOpen(false)}
          // onSubmit={addWater}
        />
      )}
    </div>
  );
};

export default WaterRatioPanel;
