import Modal from "../Modal/Modal";
import Button from "../button/Button";
import styles from "./MyDailyNormaModal.module.css";
import RadioButton from "../radio-button/RadioButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDailyNorm } from "../../redux/user/operations";

const MyDailyNormaModal = ({ onClose, setDailyNorm }) => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("woman");

  const [m, setM] = useState(0);
  const [t, setT] = useState(0);

  const amountWaterPerDay =
    gender === "woman" ? m * 0.03 + t * 0.4 : m * 0.04 + t * 0.6;
  const [customNorm, setCustomNorm] = useState("");
  const handleSave = () => {
    const normToSave = customNorm
      ? Number(customNorm) / 1000
      : amountWaterPerDay;
    console.log("MyDailyNormaModal - normToSave- ", normToSave);
    dispatch(updateDailyNorm({ dailyNorm: normToSave * 1000 }));
    setDailyNorm(normToSave);
    onClose();
  };

  return (
    <Modal
      title="My daily norma"
      classNameModal={styles.modal}
      onClose={onClose}
    >
      <div className={styles.formuls}>
        <div>
          <span>For girl:</span>
          <span className={styles.formul}> V=(M*0,03) + (T*0,4)</span>
        </div>
        <div>
          <span>For man:</span>
          <span className={styles.formul}> V=(M*0,04) + (T*0,6)</span>
        </div>
      </div>
      <div className={styles.desc}>
        <span>*</span> V is the volume of the water norm in liters per day, M is
        your body weight, T is the time of active sports, or another type of
        activity commensurate in terms of loads (in the absence of these, you
        must set 0)
      </div>
      <div>
        <h3 className={styles.subtitle}>Calculate your rate:</h3>
        <div className={styles.radioGroup}>
          <RadioButton
            label="For woman"
            value="woman"
            onChange={(e) => setGender(e.target.value)}
            selectedValue={gender}
          />
          <RadioButton
            label="For man"
            value="man"
            onChange={(e) => setGender(e.target.value)}
            selectedValue={gender}
          />
        </div>
      </div>
      <div>
        <div className={styles.inputWithLabel}>
          <label htmlFor={"weight"} className={styles.inputLabel}>
            Your weight in kilograms:
          </label>
          <input
            id="weight"
            type="text"
            placeholder="Enter weight"
            className={styles.inputField}
            onChange={(e) => setM(Number(e.target.value))}
          />
        </div>
        <div className={styles.inputWithLabel}>
          <label htmlFor={"hours"} className={styles.inputLabel}>
            The time of active participation in sports or other activities with
            a high physical. load in hours:
          </label>
          <input
            id="hours"
            type="text"
            placeholder="Enter hours"
            className={styles.inputField}
            onChange={(e) => setT(Number(e.target.value))}
          />
        </div>
        <p className={styles.textAmount}>
          The required amount of water in liters per day:{" "}
          <span>{m ? amountWaterPerDay.toFixed(1) : 0} L</span>
        </p>
      </div>
      <div className={styles.inputWithLabel}>
        <label htmlFor={"waterAmount"} className={styles.labelAmount}>
          Write down how much water you will drink:
        </label>
        <input
          id="waterAmount"
          type="text"
          placeholder="Enter amount (ml)"
          className={styles.inputField}
          onChange={(e) => setCustomNorm(e.target.value)}
        />
      </div>
      <Button className={styles.btnSave} onClick={handleSave}>
        Save
      </Button>
    </Modal>
  );
};

export default MyDailyNormaModal;
