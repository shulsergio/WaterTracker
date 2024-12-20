import { useState } from "react";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";
import Button from "../button/Button";
import styles from "./AmountWaterModal.module.css";

const AmountWaterModal = ({ onClose, isEdit = true, id, time, volume }) => {
  const [amount, setAmount] = useState(0);
  console.log("time: ", time > "07:30");
  // id ? setAmount(volume) : setAmount(0);
  const increment = () => setAmount((prevAmount) => prevAmount + 50);
  const decrement = () =>
    setAmount((prevAmount) => Math.max(0, prevAmount - 50));

  return (
    <Modal
      title={isEdit ? "Edit the entered amount of water" : "Add water"}
      classNameModal={styles.modal}
      onClose={onClose}>
      {isEdit && (
        <div className={styles.blockInfo}>
          <Icon id="glass-water" width={36} height={36} />
          <span className={styles.blockInfoAmount}>{volume} ml</span>
          <span className={styles.blockInfoTime}>
            {time} {time < "12:00" ? "AM" : "PM"}
          </span>
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
          value={id ? time : new Date().slice(11, 16)}
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
          // value={id ? volume : ""}
        />
      </div>
      <div className={styles.footerModal}>
        <div className={styles.amount}>50ml</div>
        <Button>Save</Button>
      </div>
    </Modal>
  );
};

export default AmountWaterModal;
