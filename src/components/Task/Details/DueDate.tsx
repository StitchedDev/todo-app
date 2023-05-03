import useTasks from "@/hooks/useTasks";
import styles from "@/styles/TaskDetails.module.css";
import { Task } from "@/types/Task";

type DueDateProps = {
  changeDueDate: Function;
  activeTask: Task;
};

export default function DueDate(props: DueDateProps) {
  const handleDateClick = (date: string) => {
    let currentDate = new Date();
    switch (date) {
      case "today":
        props.changeDueDate(props.activeTask, currentDate.toDateString());
        break;
      case "tomorrow":
        currentDate.setDate(currentDate.getDate() + 1);
        props.changeDueDate(props.activeTask, currentDate.toDateString());
        break;
    }
  };

  return (
    <div className={styles.detailMenu}>
      <h1 className={styles.detailHeader}>Due</h1>
      <hr></hr>

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
      </div>
    </div>
  );
}
