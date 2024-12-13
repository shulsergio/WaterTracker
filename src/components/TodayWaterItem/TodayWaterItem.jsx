import AmountWaterModal from "../AmountWaterModal/AmountWaterModal";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";
import Icon from "../Icon/Icon";
import css from "./TodayWaterItem.module.css";

const TodayWaterItem = () => {
  return (
    <div className={css.blockInfo}>
      <Icon id="glass-water" width={36} height={36} />
      <span className={css.blockInfoAmount}>250 ml</span>
      <span className={css.blockInfoTime}>7:00 AM</span>
      <div className={css.buttons}>
        <button
          onClick={AmountWaterModal}
          className={css.editIcon}
          aria-label="Edit water norma"
        >
          <Icon id="icon-edit" width={16} height={16} />
        </button>
        <button
          onClick={DeleteEntryModal}
          className={css.deleteIcon}
          aria-label="Delete water norma"
        >
          <Icon id="icon-delete" width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

export default TodayWaterItem;
