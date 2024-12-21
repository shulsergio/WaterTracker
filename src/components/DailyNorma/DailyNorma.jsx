import { useEffect, useState } from "react";
import styles from "./DailyNorma.module.css";
import MyDailyNormaModal from "../MyDailyNormaModal/MyDailyNormaModal.jsx";
import Button from "../button/Button.jsx";
import { selectUser } from "../../redux/user/selectors.js";
import { useSelector } from "react-redux";

const DailyNorma = () => {
  const user = useSelector(selectUser);
  const [dailyNorm, setDailyNorm] = useState(user?.dailyNorm / 1000 || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?.dailyNorm) {
      setDailyNorm(user.dailyNorm / 1000);
    }
  }, [user?.dailyNorm]);

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
          types={"text"}
          className={styles.editButton}
          onClick={handleEditClick}
        >
          Edit
        </Button>
      </div>
      {isModalOpen && (
        <MyDailyNormaModal
          setDailyNorm={setDailyNorm}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default DailyNorma;
