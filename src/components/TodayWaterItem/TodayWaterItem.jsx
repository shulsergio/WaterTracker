import { useDispatch, useSelector } from "react-redux";
import AmountWaterModal from "../AmountWaterModal/AmountWaterModal";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";
import Icon from "../Icon/Icon";
import css from "./TodayWaterItem.module.css";
import { useState } from "react";
import { selectDayWater } from "../../redux/dayWaterList/selectors";
import {
  deleteWaterGlass,
  // getDayWaterList,
  updateWaterGlass,
} from "../../redux/dayWaterList/operations";
import toast from "react-hot-toast";

const TodayWaterItem = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const water = useSelector(selectDayWater);
  const dispatch = useDispatch();

  const logsInfo = water.logs.map(({ date, _id, volume }) => {
    const localTime = new Date(date).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return { id: _id, date: localTime, volume };
  });

  const handleEditClick = (log) => {
    setEditData(log);
    setIsEditOpen(true);
  }; // log - id,volume, date

  const handleDeleteClick = (id) => {
    setDeleteData(id);
    setIsDeleteOpen(true);
  };

  const handleSave = (updatedGlass) => {
    setIsEditOpen(false);
    dispatch(updateWaterGlass({ id: editData.id, updatedGlass }))
      .unwrap()
      .then(() => {
        toast.success("Glass is successfully updated");

        // dispatch(getDayWaterList());
      })
      .catch((error) => {
        toast.error(`Error updating glass: ${error}`);
      });
  };

  const handleDelete = () => {
    setIsDeleteOpen(false);
    dispatch(deleteWaterGlass(deleteData))
      .unwrap()
      .then(() => {
        toast.success("Glass is deleted");

        // dispatch(getDayWaterList());
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        handleModalClose();
      });
  };

  const handleModalClose = () => {
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setEditData(null);
    setDeleteData(null);
  };

  return (
    <div className={css.blockInfo}>
      <ul className={css.loglist}>
        {logsInfo.map((log) => (
          <li key={log.id} className={css.logItem}>
            <div className={css.iconContainer}>
              <Icon id="glass-water" width={36} height={36} />
              <span className={css.blockInfoAmount}>{log.volume} ml</span>
              <span className={css.blockInfoTime}>{log.date}</span>
            </div>
            <div className={css.buttons}>
              <button
                onClick={() => handleEditClick(log)}
                className={css.editIcon}
                aria-label="Edit water norma">
                <Icon id="icon-edit" width={16} height={16} />
              </button>
              <button
                onClick={() => handleDeleteClick(log.id)}
                className={css.deleteIcon}
                aria-label="Delete water norma">
                <Icon id="icon-delete" width={16} height={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isEditOpen && (
        <AmountWaterModal
          onClose={handleModalClose}
          isEdit={true}
          data={editData}
          onSave={handleSave}
        />
      )}
      {isDeleteOpen && (
        <DeleteEntryModal
          onClose={handleModalClose}
          isEdit={true}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default TodayWaterItem;
