import useTasks from "@/hooks/useTasks";
import styles from "@/styles/TaskDetails.module.css";
import { Task } from "@/types/Task";
import { useState } from "react";
import DatePicker from "react-datepicker";

type DueDateProps = {
  changeDueDate: Function;
  activeTask: Task;
  setIsMenuOpen: Function;
};

export default function DueDate(props: DueDateProps) {
  const [openDateSelector, setOpenDateSelector] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleDateClick = (date: string) => {
    let currentDate = new Date();
    switch (date) {
      case "today":
        props.changeDueDate(props.activeTask, currentDate.toDateString());
        props.setIsMenuOpen(false);
        break;
      case "tomorrow":
        currentDate.setDate(currentDate.getDate() + 1);
        props.changeDueDate(props.activeTask, currentDate.toDateString());
        props.setIsMenuOpen(false);
        break;
      case "custom":
        setOpenDateSelector(!openDateSelector);
        break;
      default:
        const selectedDate = new Date(date);
        props.changeDueDate(props.activeTask, selectedDate.toDateString());
        props.setIsMenuOpen(false);
    }
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
            onClick={() => handleDateClick(startDate.toDateString())}
          >
            Confirm
          </button>
        </div>
      ) : (
        <div className={styles.detailOptions}>
          <div
            className={styles.detailOption}
            onClick={() => handleDateClick("today")}
          >
            Today
          </div>
          <div
            className={styles.detailOption}
            onClick={() => handleDateClick("tomorrow")}
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
