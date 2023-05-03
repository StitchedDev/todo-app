import styles from "@/styles/TaskDetails.module.css";
import { Task } from "@/types/Task";
import { useEffect, useState } from "react";
import DueDate from "./DueDate";
import { FaCalendarAlt } from "react-icons/fa";
import useTasks from "@/hooks/useTasks";
import TaskDetailsControls from "./Controls";

type TaskDetailsProps = {
  toggleDisplay: Function;
  task: Task;
};

export default function TaskDetails(props: TaskDetailsProps) {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeTask, setActiveTask] = useState<Task>(props.task);
  const {
    tasks,
    changeDueDate,
    deleteTask,
    setNewTaskName,
    setTasks,
    newTaskName,
  } = useTasks();

  useEffect(() => {
    tasks.forEach((currentTask: Task) => {
      if (currentTask.id !== activeTask.id) return;
      setActiveTask(currentTask);
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
        return (
          <DueDate
            setIsMenuOpen={setIsMenuOpen}
            changeDueDate={changeDueDate}
            activeTask={activeTask}
          />
        );
    }
  };

  const handleSave = () => {
    setTasks((prevTasks: Task[]) => {
      const newTasks: Task[] = prevTasks.map((prevTask: Task) => {
        if (prevTask.id !== activeTask.id) return prevTask;
        return {
          ...prevTask,
          ...activeTask,
        };
      });

      return newTasks;
    });
    props.toggleDisplay();
  };

  const getDueDateText = () => {
    const today = new Date();
    if (!activeTask.date) return "Add due date";
    if (activeTask.date == today.toDateString()) return "Today";

    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    if (activeTask.date == tomorrow.toDateString()) return "Tomorrow";

    return activeTask.date;
  };

  return (
    <div className={styles.taskDetailsContainer}>
      <div className={styles.taskDetailHeader}>
        <input
          value={newTaskName}
          onChange={(e: any) => setNewTaskName(e.target.value)}
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

        <button
          onClick={() => props.toggleDisplay()}
          className={styles.backBtn}
        >
          Cancel
        </button>
      </div>

      {isMenuOpen ? displayActiveMenu() : null}

      <TaskDetailsControls task={activeTask} deleteTask={deleteTask} />
    </div>
  );
}
