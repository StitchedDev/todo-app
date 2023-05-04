import styles from "@/styles/TaskDetails.module.css";
import { Task } from "@/types/Task";
import { useEffect, useState, useContext } from "react";
import DueDate from "./DueDate";
import { FaCalendarAlt } from "react-icons/fa";
import { TaskContext } from "@/hooks/useTasks";
import TaskDetailsControls from "./Controls";

type TaskDetailsProps = {
  toggleDisplay: Function;
};

export default function TaskDetails(props: TaskDetailsProps) {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const {
    tasks,
    changeDueDate,
    deleteTask,
    setNewTaskName,
    editTask,
    newTaskName,
    activeTask,
    setActiveTask,
    setTempTask,
    saveTempTask,
    tempTask,
  } = useContext(TaskContext);

  useEffect(() => {
    tasks.forEach((currentTask: Task) => {
      if (currentTask.id !== activeTask.id) return;
      setActiveTask(currentTask);
      setTempTask(currentTask);
      setNewTaskName(currentTask.title);
    });
  }, [tasks]);

  const addDueDate = () => {
    setIsMenuOpen(true);
    setActiveMenu("dueDate");
  };

  const displayActiveMenu = () => {
    switch (activeMenu) {
      case "dueDate":
        return <DueDate setIsMenuOpen={setIsMenuOpen} />;
    }
  };

  const handleSave = () => {
    saveTempTask();
    setActiveTask({} as Task);
    setTempTask({} as Task);
    props.toggleDisplay();
  };

  const handleCancel = () => {
    setActiveTask({} as Task);
    setTempTask({} as Task);

    props.toggleDisplay();
  };

  const getDueDateText = () => {
    const today = new Date();
    const taskDate = new Date(tempTask.date || activeTask.date);
    if (!taskDate) return "Add due date";
    if (taskDate.toDateString() == today.toDateString()) return "Today";

    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    if (taskDate.toDateString() == tomorrow.toDateString()) return "Tomorrow";

    console.log(tempTask);
    return taskDate.toDateString();
  };

  return (
    <div className={styles.taskDetailsContainer}>
      <div className={styles.taskDetailHeader}>
        <input
          value={tempTask.title || activeTask.title}
          onChange={(e: any) => editTask(tempTask, "title", e.target.value)}
          className={styles.taskName}
        />
      </div>

      <div>
        <div className={`${styles.detailCard}`} onClick={() => addDueDate()}>
          <FaCalendarAlt className={`${styles.detailLogo}`} />
          <div>{getDueDateText()}</div>
        </div>
      </div>

      <div className={styles.btnContainer}>
        <button
          onClick={() => handleSave()}
          className={`${styles.saveBtn} btn`}
        >
          Save
        </button>

        <button onClick={() => handleCancel()} className={styles.backBtn}>
          Cancel
        </button>
      </div>

      {isMenuOpen ? displayActiveMenu() : null}

      <TaskDetailsControls task={activeTask} deleteTask={deleteTask} />
    </div>
  );
}
