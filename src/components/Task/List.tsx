import { Task } from "@/types/Task";
import TaskCard from "./Card";
import TaskNewCard from "./NewCard";
import { Ref, useContext } from "react";
import { TaskContext } from "@/hooks/useTasks";

type TaskListProps = {
  inputRef: Ref<HTMLInputElement>;
  inputFocus: Function;
  handleTaskDetails: Function;
  selectTask: Function;
};

export default function TaskList(props: TaskListProps) {
  const { createTask, tasks } = useContext(TaskContext);

  return (
    <>
      <TaskNewCard
        inputRef={props.inputRef}
        inputFocus={props.inputFocus}
        createTask={createTask}
      />
      {tasks.map((task: Task) => {
        return <TaskCard key={task.id} task={task} {...props} />;
      })}
    </>
  );
}
