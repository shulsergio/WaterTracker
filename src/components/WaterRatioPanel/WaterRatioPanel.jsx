import { useState } from 'react';
import styles from './WaterRatioPanel.module.css';
import AmountWaterModal from '../AmountWaterModal/AmountWaterModal';
import Icon from '../Icon/Icon';

const WaterRatioPanel = () => {
  const [currentWater, setCurrentWater] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dailyGoal = 2000; // Загальна норма в мл

  const addWater = (amount) => {
    setCurrentWater((prev) => Math.min(prev + amount, dailyGoal));
  };

  const progressPercentage = Math.min((currentWater / dailyGoal) * 100, 100);

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
              style={{ left: `calc(${progressPercentage}% - 8px)` }}
            ></div>
          </div>
        </div>
        <div className={styles.markersContainer}>
        <div className={styles.markerStart}>
            <div className={styles.markerLine}></div>
            <div className={`${styles.markerText} ${progressPercentage >= 0 && progressPercentage < 50 ? styles.markerTextActive : ''}`}>
              0%
            </div>
          </div>
          <div className={styles.markerCenter}>
            <div className={styles.markerLine}></div>
            <div className={`${styles.markerText} ${progressPercentage >= 50 && progressPercentage < 100 ? styles.markerTextActive : ''}`}>
              50%
            </div>
          </div>
          <div className={styles.markerEnd}>
            <div className={styles.markerLine}></div>
            <div className={`${styles.markerText} ${progressPercentage === 100 ? styles.markerTextActive : ''}`}>
              100%
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setIsModalOpen(true)} className={styles.addButton}>
      <Icon id='icon-plus-circle' className={styles.plusCircle} /> Add Water
      </button>
      {isModalOpen && (
        <AmountWaterModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={addWater}
        />
      )}
    </div>
  );
};

export default WaterRatioPanel;
