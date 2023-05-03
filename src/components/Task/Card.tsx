import { Task } from "@/types/Task";
import styles from "@/styles/TaskCard.module.css";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { useState, useContext } from "react";
import { TaskContext } from "@/hooks/useTasks";

type TaskCardProps = {
  task: Task;
  toggleDisplay: Function;
};

export default function TaskCard({ task, toggleDisplay }: TaskCardProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const { toggleEditMode, setActiveTask } = useContext(TaskContext);
  const handleHover = () => {
    setIsHovering((prevHovering: boolean) => !prevHovering);
  };

  const openTaskDetails = () => {
    setActiveTask(task);
    toggleDisplay();
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

      <div className={styles.taskHeader} onClick={() => openTaskDetails()}>
        <span>{task.finished ? <s>{task.title}</s> : task.title}</span>
      </div>
    </div>
  );
}
