import useTasks from "@/hooks/useTasks";
import { Task } from "@/types/Task";
import { useState } from "react";
import TaskList from "./List";

export default function TaskView() {
  const {
    tasks,
    createTask,
    clearTasks,
    setNewTaskName,
    newTaskName,
    editTask,
    toggleEditMode,
    deleteTask,
    markTaskComplete,
  } = useTasks();

  return (
    <div>
      <h1>Tasks</h1>

      <TaskList
        tasks={tasks}
        editTask={editTask}
        toggleEditMode={toggleEditMode}
        deleteTask={deleteTask}
        markTaskComplete={markTaskComplete}
      />

      <div>
        <input
          type="text"
          placeholder="Task Name"
          onChange={(e: any) => setNewTaskName(e.target.value)}
          value={newTaskName}
        />
        <button onClick={() => createTask(newTaskName)}>Create New Task</button>
      </div>

      <button onClick={() => clearTasks()}>Clear All</button>
    </div>
  );
}
