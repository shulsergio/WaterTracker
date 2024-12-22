import { useState } from "react";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";
import Button from "../button/Button";
import styles from "./AddWaterModal.module.css";
import { useDispatch } from "react-redux";
import {
  addWaterGlass,
  getDayWaterList,
} from "../../redux/dayWaterList/operations.js";
import toast from "react-hot-toast";

const AddWaterModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const date = new Date();

  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(
    date.toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
  );

  const increment = () => setAmount((prevAmount) => prevAmount + 50);
  const decrement = () =>
    setAmount((prevAmount) => Math.max(0, prevAmount - 50));

  const handleClick = () => {
    const [hours, minutes] = time.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
    date.toISOString();
    const data = {
      volume: amount,
      date: date.toISOString(),
    };

    onClose();
    if (amount > 0) {
      dispatch(addWaterGlass(data));
      dispatch(getDayWaterList());
      toast.success("Water data added");
    } else {
      toast.error("Somethimg went wrong");
    }
  };

  const handleChangeTime = (e) => {
    setTime(e.target.value);
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  return (
    <Modal title="Add water" classNameModal={styles.modal} onClose={onClose}>
      <div>
        <h3 className={styles.subtitle}>Choose a value:</h3>
        <h3 className={styles.amountOfWaterTitle}>Amount of water:</h3>
        <div className={styles.calcBlock}>
          <button onClick={decrement} className={styles.calcBlockBtn}>
            <Icon id="icon-minus" className={styles.calcIcon} />
          </button>
          <div className={styles.valueWaterMl}>{amount} ml</div>
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
          value={time}
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
        />
      </div>
      <div className={styles.footerModal}>
        <div className={styles.amount}>{amount}ml</div>
        <Button onClick={handleClick} className={styles.buttonModal}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default AddWaterModal;
