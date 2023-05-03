import useTasks, { TaskContext } from "@/hooks/useTasks";
import TaskList from "./List";
import styles from "@/styles/TaskCard.module.css";
import AddButton from "../AddButton";
import { Task } from "@/types/Task";
import { useRef, useState, useContext } from "react";
import TaskDetails from "./Details";

export default function TaskView() {
  const [showTaskDetails, setShowTaskDetails] = useState<boolean>(false);
  const [activeTask, setActiveTask] = useState<Task>({} as Task);
  const { tasks, markSelectedComplete } = useContext(TaskContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const inputFocus = () => {
    inputRef.current?.focus();
  };

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

  const handleTaskDetails = (task: Task) => {
    console.log(task);
    if (!task) return;

    setShowTaskDetails((prevState: boolean) => !prevState);
    setActiveTask(task);
  };

  return (
    <TaskContext.Provider value={useTasks()}>
      {showTaskDetails ? (
        <TaskDetails toggleDisplay={handleTaskDetails} task={activeTask} />
      ) : (
        <div>
          <h1 className={styles.remainingTaskHeader}>
            Remaining Tasks <strong>({getRemainingTasks()})</strong>
          </h1>

          <TaskList
            selectTask={setActiveTask}
            inputRef={inputRef}
            inputFocus={inputFocus}
            handleTaskDetails={handleTaskDetails}
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
            {/* <AddButton style={{ cursor: "pointer" }} onClick={() => inputFocus()} /> */}
          </div>
        </div>
      )}
    </TaskContext.Provider>
  );
}
