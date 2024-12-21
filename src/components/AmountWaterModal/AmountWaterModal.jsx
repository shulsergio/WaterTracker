import { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";
import Button from "../button/Button";
import styles from "./AmountWaterModal.module.css";

const AmountWaterModal = ({ onClose, isEdit = true, data, onSave }) => {
  const [amount, setAmount] = useState(data?.volume || 0);
  const [time, setTime] = useState(data?.date || "");

  const increment = () => setAmount((prevAmount) => prevAmount + 50);
  const decrement = () =>
    setAmount((prevAmount) => Math.max(0, prevAmount - 50));

  useEffect(() => {
    if (data) {
      setAmount(data.volume);
      setTime(data.date);
    }
  }, [data]);

  const handleSave = () => {
    const updatedGlass = { volume: amount, date: time };
    onSave(updatedGlass); // Pass updated data back to parent
  };

  return (
    <Modal
      title={isEdit ? "Edit the entered amount of water" : "Add water"}
      classNameModal={styles.modal}
      onClose={onClose}
    >
      {isEdit && (
        <div className={styles.blockInfo}>
          <Icon id="glass-water" width={36} height={36} />
          <span className={styles.blockInfoAmount}>250 ml</span>
          <span className={styles.blockInfoTime}>7:00 AM</span>
        </div>
      )}
      <div>
        <h3 className={styles.subtitle}>Correct entered data:</h3>
        <h3 className={styles.amountOfWaterTitle}>Amount of water:</h3>
        <div className={styles.calcBlock}>
          <button onClick={decrement} className={styles.calcBlockBtn}>
            <Icon id="icon-minus" className={styles.calcIcon} />
          </button>
          <div className={styles.valueWaterMl}>{amount}ml</div>
          <button onClick={increment} className={styles.calcBlockBtn}>
            <Icon id="icon-increment" width={14} height={14} />
          </button>
        </div>
      </div>

      <div className={styles.inputWithLabel}>
        <label htmlFor={"weight"} className={styles.inputLabel}>
          Recording time:
        </label>
        <input
          id="weight"
          type="text"
          placeholder="Enter time"
          className={styles.inputField}
        />
      </div>

      <div className={styles.inputWithLabel}>
        <label htmlFor={"waterAmount"} className={styles.labelAmount}>
          Enter the value of the water used:
        </label>
        <input
          id="waterAmount"
          type="text"
          placeholder="Enter amount"
          className={styles.inputField}
        />
      </div>
      <div className={styles.footerModal}>
        <div className={styles.amount}>50ml</div>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Modal>
  );
};

export default AmountWaterModal;
