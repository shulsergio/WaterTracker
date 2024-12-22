import { useEffect, useState } from "react";
import styles from "./WaterRatioPanel.module.css";
import { selectDailyNorm, selectUser } from "../../redux/user/selectors";
import { useSelector } from "react-redux";
import { selectMonthWater } from "../../redux/monthWaterList/selectors";
import { selectdayWater } from "../../redux/dayWaterList/selectors";
import AddWaterModal from "../AddWaterModal/AddWaterModal.jsx";
import Icon from "../Icon/Icon.jsx";
import Button from "../button/Button.jsx";

const WaterRatioPanel = () => {
  console.log("------ WaterRatioPanel ------");
  // const dispatch = useDispatch();
  const monthWater = useSelector(selectMonthWater);
  const dayWater = useSelector(selectdayWater);
  const user = useSelector(selectUser);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const progressPercentaged =
    progressPercentage > 100 ? 100 : progressPercentage;
  console.log("progressPercentaged - ", progressPercentaged);
  console.log("progressPercentage - ", progressPercentage);
  // const progressPercentage = dayWater.consumedPercentage * 100;
  const sliderPosition = `calc(${progressPercentaged}% - 8px)`;
  const add1 = parseFloat(
    (dailyGoal - (dailyGoal * progressPercentaged) / 100).toFixed(1)
  );
  const additionalData =
    add1 > 0
      ? `Today still need to drink ${add1}ml `
      : `Norm of drinking water is ${add1} more`;
  return (
    <div className={styles.progressContainer}>
      <div className={styles.containerProgress}>
        <h2 className={styles.title}>Today</h2>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isTooltipVisible && (
              <div className={styles.infoTooltip}>{additionalData}</div>
            )}
            <div
              className={styles.progressFilled}
              style={{ width: `${progressPercentaged}%` }}
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
                progressPercentage >= 0 && progressPercentaged < 50
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
                progressPercentaged >= 50 && progressPercentaged < 100
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
                progressPercentaged === 100 ? styles.markerTextActive : ""
              }`}
            >
              100%
            </div>
          </div>
        </div>
      </div>
      <Button onClick={() => setIsModalOpen(true)} className={styles.addButton}>
        <Icon id="icon-plus-circle" className={styles.plusCircle} /> Add Water
      </Button>
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
