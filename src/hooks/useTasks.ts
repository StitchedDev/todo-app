import { Task } from "@/types/Task";
import { useEffect, useState, createContext } from "react";

type TaskContextProps = {
  tasks: Task[];
  createTask: Function;
  editTask: Function;
  toggleEditMode: Function;
  markTaskComplete: Function;
  deleteTask: Function;
  clearTasks: Function;
  newTaskName: string;
  setNewTaskName: Function;
  markSelectedComplete: Function;
  changeDueDate: Function;
  setTasks: Function;
  activeTask: Task;
  setActiveTask: Function;
  saveTempTask: Function;
  setTempTask: Function;
  tempTask: Task;
};

export const TaskContext = createContext<TaskContextProps>(
  {} as TaskContextProps
);

export default function useTasks(): TaskContextProps {
  const [tasks, setTasks] = useState<Task[]>([] as Task[]);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [activeTask, setActiveTask] = useState<Task>({} as Task);
  const [tempTask, setTempTask] = useState<Task>({} as Task);

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "");
      if (storedTasks.length === 0) return;

      setTasks(storedTasks);
    } catch (e: any) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }, []);

  const createTask = (taskName: string) => {
    if (!taskName) return;

    setNewTaskName("");

    setTasks((prevTasks: Task[]) => {
      const finalTask = prevTasks.length - 1;
      const id = finalTask === -1 ? 0 : prevTasks[finalTask].id + 1;

      const newTasks: Task[] = [
        ...prevTasks,
        {
          id,
          title: taskName,
          finished: false,
          editing: false,
          date: new Date(),
          selected: false,
        },
      ];

      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const editTask = (task: Task, property: string, value: Date | string) => {
    setTempTask({
      ...task,
      [property]: value,
    });
  };

  const saveTempTask = () => {
    setTasks((prevTasks: Task[]): Task[] => {
      const newTasks: Task[] = prevTasks.map((prevTask: Task) => {
        if (prevTask.id !== tempTask.id) return prevTask;
        return tempTask;
      });

      localStorage.setItem("tasks", JSON.stringify(newTasks));

      return newTasks;
    });
  };

  const toggleEditMode = (task: Task) => {
    setTasks((prevTasks: Task[]) => {
      const newTasks: Task[] = prevTasks.map((prevTask: Task) => {
        if (prevTask.id !== task.id) return prevTask;

        return {
          ...prevTask,
          editing: !prevTask.editing,
          selected: !prevTask.selected,
        };
      });

      localStorage.setItem("tasks", JSON.stringify(newTasks));

      return newTasks;
    });
  };

  const markTaskComplete = (task: Task) => {
    setTasks((prevTasks: Task[]) => {
      const newTasks: Task[] = prevTasks.map((prevTask: Task) => {
        if (prevTask.id !== task.id) return prevTask;
        return {
          ...prevTask,
          finished: true,
        };
      });

      localStorage.setItem("tasks", JSON.stringify(newTasks));

      return newTasks;
    });
  };

  const markSelectedComplete = () => {
    setTasks((prevTasks: Task[]) => {
      const newTasks: Task[] = prevTasks.map((prevTask: Task) => {
        if (!prevTask.selected) return prevTask;

        return {
          ...prevTask,
          finished: true,
          selected: false,
        };
      });

      localStorage.setItem("tasks", JSON.stringify(newTasks));

      return newTasks;
    });
  };

  const deleteTask = (task: Task) => {
    setTasks((prevTasks: Task[]) => {
      const newTasks: Task[] = prevTasks.filter(
        (prevTask: Task) => prevTask.id !== task.id
      );

      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const clearTasks = () => {
    localStorage.setItem("tasks", JSON.stringify([]));
    setTasks([]);
  };

  const changeDueDate = (task: Task, dueDate: Date) => {
    if (!dueDate) return;

    setTempTask((prevTempTask: Task) => {
      return {
        ...prevTempTask,
        date: dueDate,
      };
    });
  };

  return {
    tasks,
    createTask,
    editTask,
    toggleEditMode,
    markTaskComplete,
    deleteTask,
    clearTasks,
    newTaskName,
    setNewTaskName,
    markSelectedComplete,
    changeDueDate,
    setTasks,
    activeTask,
    setActiveTask,
    saveTempTask,
    tempTask,
    setTempTask,
  };
}
