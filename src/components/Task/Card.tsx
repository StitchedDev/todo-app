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
};

export default function TaskCard({
  task,
  editTask,
  toggleEditMode,
}: TaskCardProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleHover = () => {
    setIsHovering(!isHovering);
  };

  return (
    <div key={task.id} className={styles.taskCard}>
      <div
        onClick={() => toggleEditMode(task)}
        onMouseEnter={() => handleHover()}
        onMouseLeave={() => handleHover()}
      >
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

      <div className={styles.taskHeader}>
        <input value={task.title} onChange={(e: any) => editTask(e, task)} />
      </div>
    </div>
  );
}
