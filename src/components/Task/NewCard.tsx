import styles from "@/styles/TaskCard.module.css";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useState, useContext } from "react";
import { TaskContext } from "@/hooks/useTasks";

export default function TaskNewCard() {
  const [selected, setSelected] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const { createTask } = useContext(TaskContext);

  const handleAddButton = () => {
    createTask(taskName);
    setTaskName("");
    setSelected(false);
  };

  return (
    <div className={`${styles.newTaskCardContainer}`}>
      <div className={`${styles.taskCard} ${styles.newTaskCard}`}>
        <div>
          {selected ? (
            <FaCheckCircle
              className={`${styles.checkmark} ${styles.checkmarkSelected}`}
            />
          ) : (
            <FaPlusCircle
              className={styles.checkmark}
              onClick={() => setSelected(!selected)}
            />
          )}
        </div>

        <div className={`${styles.taskHeader} ${styles.newTaskHeader}`}>
          <input
            value={taskName}
            onChange={(e: any) => setTaskName(e.target.value)}
            placeholder="Add a task"
            onFocus={() => setSelected(true)}
          />
        </div>
      </div>

      <div
        className={`${selected ? styles.newTaskMenu : styles.hiddenTaskMenu}`}
      >
        <button onClick={() => handleAddButton()}>Add</button>
      </div>
    </div>
  );
}
