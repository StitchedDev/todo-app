import { Task } from "@/types/Task";
import { useEffect, useState } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([] as Task[]);
  const [newTaskName, setNewTaskName] = useState<string>("");

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
          date: "05/02/2023",
          selected: false,
        },
      ];

      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const editTask = (e: any, task: Task) => {
    setTasks((prevTasks: Task[]): Task[] => {
      return prevTasks.map((prevTask: Task) => {
        if (prevTask.id !== task.id) return prevTask;
        return {
          ...prevTask,
          title: e.target.value,
        };
      });
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
  };
}
