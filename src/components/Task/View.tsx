import useTasks, { TaskContext } from "@/hooks/useTasks";
import TaskList from "./List";
import styles from "@/styles/TaskCard.module.css";
import { Task } from "@/types/Task";
import { useState, useContext } from "react";
import TaskDetails from "./Details";

export default function TaskView() {
  const [showTaskDetails, setShowTaskDetails] = useState<boolean>(false);
  const { activeTask, setActiveTask, tasks, markSelectedComplete } =
    useContext(TaskContext);

  const getRemainingTasks = () => {
    if (!tasks || tasks.length === 0) return "0";

    const remainingTasks = tasks.filter((task: Task) => !task.finished);
    return remainingTasks.length;
  };

  const shouldMarkComplete = () => {
    if (!tasks || tasks.length === 0) return;
    const foundSelected = tasks.filter((task: Task) => task.selected);

    if (foundSelected.length > 0) return true;
    return false;
  };

  const handleTaskDetailsMenu = () => {
    setShowTaskDetails((prevState: boolean) => !prevState);
  };

  return showTaskDetails ? (
    <TaskDetails toggleDisplay={handleTaskDetailsMenu} />
  ) : (
    <div>
      <h1 className={styles.remainingTaskHeader}>
        Remaining Tasks <strong>({getRemainingTasks()})</strong>
      </h1>

      <TaskList
        selectTask={setActiveTask}
        toggleDisplay={handleTaskDetailsMenu}
      />

      <div className={styles.newTaskContainer}>
        {shouldMarkComplete() ? (
          <button
            className={styles.markCompleteBtn}
            onClick={() => markSelectedComplete()}
          >
            Mark Complete
          </button>
        ) : null}
      </div>
    </div>
  );
}
