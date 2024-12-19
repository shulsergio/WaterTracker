import { useSelector } from "react-redux";
import AmountWaterModal from "../AmountWaterModal/AmountWaterModal";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";
import Icon from "../Icon/Icon";
import css from "./TodayWaterItem.module.css";
import { useState } from "react";
import { selectdayWater } from "../../redux/dayWaterList/selectors";

const TodayWaterItem = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setisDeleteOpen] = useState(false);
  const water = useSelector(selectdayWater);

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleDeleteClick = () => {
    setisDeleteOpen(true);
  };

  const handleModalClose = () => {
    setIsEditOpen(false);
    setisDeleteOpen(false);
  };

  const logsInfo = water.logs.map(({ date, id, volume }) => ({
    id,
    date: date.slice(11, 16),
    volume,
  }));

  return (
    <div className={css.blockInfo}>
      <ul className={css.loglist}>
        {logsInfo.map(({ id, date, volume }) => (
          <li key={id} className={css.logItem}>
            <div className={css.iconContainer}>
              <Icon id="glass-water" width={36} height={36} />
              <span className={css.blockInfoAmount}>{volume}</span>
              <span className={css.blockInfoTime}>{date}</span>
            </div>
            <div className={css.buttons}>
              <button
                onClick={handleEditClick}
                className={css.editIcon}
                aria-label="Edit water norma"
              >
                <Icon id="icon-edit" width={16} height={16} />
              </button>
              <button
                onClick={handleDeleteClick}
                className={css.deleteIcon}
                aria-label="Delete water norma"
              >
                <Icon id="icon-delete" width={16} height={16} />
              </button>
            </div>
            {isEditOpen && (
              <AmountWaterModal onClose={handleModalClose} isEdit={true} />
            )}
            {isDeleteOpen && <DeleteEntryModal onClose={handleModalClose} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodayWaterItem;
