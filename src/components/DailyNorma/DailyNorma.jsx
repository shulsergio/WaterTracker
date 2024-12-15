import { useState } from "react";
import styles from "./DailyNorma.module.css";
import MyDailyNormaModal from "../MyDailyNormaModal/MyDailyNormaModal.jsx";
import Button from "../button/Button.jsx";

const DailyNorma = () => {
  const [dailyNorm, setDailyNorm] = useState(1.5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = (newNorm) => {
    if (newNorm) setDailyNorm(newNorm);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My daily norma</h2>
      <div className={styles.value}>
        <span className={styles.norma}>{dailyNorm} L</span>
        <Button
          className={styles.editButton}
          types="text"
          onClick={handleEditClick}
        >
          Edit
        </Button>
      </div>
      {isModalOpen && (
        <MyDailyNormaModal initialNorm={dailyNorm} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default DailyNorma;
