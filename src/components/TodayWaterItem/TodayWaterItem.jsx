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

  return (
    <div className={css.blockInfo}>
      <div className={css.iconContainer}>
        <Icon id="glass-water" width={36} height={36} />
        <span className={css.blockInfoAmount}>250 ml</span>
        <span className={css.blockInfoTime}>7:00 AM</span>
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
    </div>
  );
};

export default TodayWaterItem;
