import { Task } from "@/types/Task";
import styles from "@/styles/TaskCard.module.css";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
  editTask: Function;
  toggleEditMode: Function;
  deleteTask: Function;
  markTaskComplete: Function;
  handleTaskDetails: Function;
};

export default function TaskCard({
  task,
  editTask,
  toggleEditMode,
  handleTaskDetails,
}: TaskCardProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleHover = () => {
    setIsHovering((prevHovering: boolean) => !prevHovering);
  };

  return (
    <div
      key={task.id}
      className={styles.taskCard}
      onMouseEnter={() => handleHover()}
      onMouseLeave={() => handleHover()}
    >
      <div onClick={() => toggleEditMode(task)}>
        {task.selected ? (
          <FaCheckCircle
            className={`${styles.checkmark} ${styles.checkmarkSelected}`}
          />
        ) : isHovering ? (
          <FaCheckCircle className={styles.checkmark} />
        ) : (
          <FaCircle className={styles.checkmark} />
        )}
      </div>

      <div
        className={styles.taskHeader}
        onClick={() => handleTaskDetails(task)}
      >
        <span>{task.finished ? <s>{task.title}</s> : task.title}</span>
      </div>
    </div>
  );
}
