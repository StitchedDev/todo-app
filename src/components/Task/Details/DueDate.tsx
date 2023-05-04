import useTasks, { TaskContext } from "@/hooks/useTasks";
import styles from "@/styles/TaskDetails.module.css";
import { Task } from "@/types/Task";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

type DueDateProps = {
  setIsMenuOpen: Function;
};

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export default function DueDate(props: DueDateProps) {
  const [openDateSelector, setOpenDateSelector] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { changeDueDate, tempTask } = useContext(TaskContext);

  const handleDateClick = (date: Date | string) => {
    if (date == "custom") setOpenDateSelector(!openDateSelector);
    if (typeof date == "string") return;
    changeDueDate(tempTask, date);
    props.setIsMenuOpen(false);
  };

  return (
    <div className={styles.detailMenu}>
      <h1 className={styles.detailHeader}>Due</h1>
      <hr></hr>

      {openDateSelector ? (
        <div className={styles.datePicker}>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />

          <button
            className={styles.datePickerConfirmBtn}
            onClick={() => handleDateClick(startDate)}
          >
            Confirm
          </button>
        </div>
      ) : (
        <div className={styles.detailOptions}>
          <div
            className={styles.detailOption}
            onClick={() => handleDateClick(new Date())}
          >
            Today
          </div>
          <div
            className={styles.detailOption}
            onClick={() => handleDateClick(tomorrow)}
          >
            Tomorrow
          </div>
          <div
            className={styles.detailOption}
            onClick={() => handleDateClick("custom")}
          >
            Custom Date
          </div>
        </div>
      )}
    </div>
  );
}
