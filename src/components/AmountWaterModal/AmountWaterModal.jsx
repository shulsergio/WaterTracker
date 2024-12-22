import { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";
import Button from "../button/Button";
import styles from "./AmountWaterModal.module.css";
import toast from "react-hot-toast";

const AmountWaterModal = ({ onClose, isEdit = true, data, onSave }) => {
  const [amount, setAmount] = useState(data?.volume || 0);
  const [time, setTime] = useState(data?.date || "");
  const editAmount = amount;

  const date = new Date();
  const timeData = date.toISOString();
  const [timeNow, setTimeNow] = useState(
    date.toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
  );

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
    const updatedGlass = {
      volume: amount,
      date: new Date(timeData).toISOString(),
    };
    console.log("updated glass", updatedGlass);
    if (updatedGlass.volume > 0) {
      onSave(updatedGlass); // Pass updated data back to parent
    } else {
      toast.error("Should be at least 1 ml");
    }
  };

  const handleChangeTime = (e) => {
    setTimeNow(e.target.value);
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
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
          <span className={styles.blockInfoAmount}>{editAmount} ml</span>
          <span className={styles.blockInfoTime}>{time}</span>
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
          value={timeNow}
          onChange={handleChangeTime}
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
          value={amount}
          onChange={handleChangeAmount}
          className={styles.inputField}
        />
      </div>
      <div className={styles.footerModal}>
        <div className={styles.amount}>{amount} ml</div>
        <Button onClick={handleSave} className={styles.buttonModal}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default AmountWaterModal;
