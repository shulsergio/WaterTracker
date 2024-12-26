import { useState } from "react";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";
import Button from "../button/Button";
import styles from "./AmountWaterModal.module.css";
import toast from "react-hot-toast";
import * as Yup from "yup";

const AmountWaterModal = ({ onClose, data, onSave }) => {
  const editAmount = data?.volume || 0;
  const timeData = data?.date || "";

  const [amount, setAmount] = useState(editAmount);
  const [timeNow, setTimeNow] = useState(timeData);
  const [error, setError] = useState("");

  const date = new Date();

  const increment = () => setAmount((prevAmount) => prevAmount + 50);
  const decrement = () =>
    setAmount((prevAmount) => Math.max(0, prevAmount - 50));

  const handleSave = () => {
    const [hours, minutes] = timeNow.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
    const updatedGlass = {
      volume: amount,
      date: date.toISOString(),
    };

    if ((updatedGlass.volume > 0) & (amount <= 4000)) {
      toast.success("Water data successfully changed");
      onSave(updatedGlass); // Pass updated data back to parent
    } else {
      toast.error("Something went wrong");
      return;
    }
  };

  const schemaTime = Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Enter time in hh:mm format")
    .required("This field is required");

  const handleChangeTime = (e) => {
    setTimeNow(e.target.value);

    schemaTime
      .validate(e.target.value)
      .then(() => setError(""))
      .catch((err) => setError(err.message));
  };

  const schemaAmount = Yup.number()
    .min(1, "The value must be greater than 0")
    .max(4000, "the value must be less than 4000")
    .required("This field is required");

  const handleChangeAmount = (e) => {
    setAmount(Number(e.target.value));

    schemaAmount
      .validate(e.target.value)
      .then(() => setError(""))
      .catch((err) => setError(err.message));
  };

  return (
    <Modal
      title={"Edit the entered amount of water"}
      classNameModal={styles.modal}
      onClose={onClose}>
      <div className={styles.blockInfo}>
        <Icon id="glass-water" width={36} height={36} />
        <span className={styles.blockInfoAmount}>{editAmount} ml</span>
        <span className={styles.blockInfoTime}>{timeData}</span>
      </div>

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
          type="time"
          placeholder="Enter time"
          className={styles.inputField}
          value={timeNow}
          onChange={handleChangeTime}
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
          value={amount}
          onChange={handleChangeAmount}
          min="0"
          max="4000"
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
