import styles from "@/styles/TaskDetails.module.css";
import { Task } from "@/types/Task";
import { useEffect, useState } from "react";
import DueDate from "./DueDate";
import { FaCalendarAlt } from "react-icons/fa";
import useTasks from "@/hooks/useTasks";

type TaskDetailsProps = {
  toggleDisplay: Function;
  task: Task;
};

export default function TaskDetails(props: TaskDetailsProps) {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeTask, setActiveTask] = useState<Task>(props.task);
  const { tasks, changeDueDate } = useTasks();

  useEffect(() => {
    tasks.forEach((currentTask: Task) => {
      if (currentTask.id === activeTask.id) setActiveTask(currentTask);
    });
  }, [tasks]);

  const addDueDate = () => {
    setIsMenuOpen(true);
    setActiveMenu("dueDate");
  };

  const displayActiveMenu = () => {
    switch (activeMenu) {
      case "dueDate":
        return (
          <DueDate changeDueDate={changeDueDate} activeTask={activeTask} />
        );
    }
  };

  const getDueDateText = () => {
    const today = new Date();
    if (!activeTask.date) return "Add due date";
    if (activeTask.date == today.toDateString()) return "Today";

    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    if (activeTask.date == tomorrow.toDateString()) return "Tomorrow";
  };

  return (
    <div className={styles.taskDetailsContainer}>
      <h1 className={styles.taskDetailHeader}>
        Task Details for <input value={activeTask.title} />
      </h1>

      <div>
        <div className={`${styles.detailCard}`} onClick={() => addDueDate()}>
          <FaCalendarAlt className={`${styles.detailLogo}`} />
          <div>{getDueDateText()}</div>
        </div>
      </div>

      <button onClick={() => props.toggleDisplay()}>Go Back</button>

      {isMenuOpen ? displayActiveMenu() : null}
    </div>
  );
}
