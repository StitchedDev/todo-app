import { Task } from "@/types/Task";
import TaskCard from "./Card";
import TaskNewCard from "./NewCard";
import { Ref } from "react";

type TaskListProps = {
  tasks: Task[];
  editTask: Function;
  toggleEditMode: Function;
  deleteTask: Function;
  markTaskComplete: Function;
  inputRef: Ref<HTMLInputElement>;
  inputFocus: Function;
};
export default function TaskList(props: TaskListProps) {
  return (
    <>
      <TaskNewCard inputRef={props.inputRef} inputFocus={props.inputFocus} />
      {props.tasks.map((task: Task) => {
        return <TaskCard key={task.id} task={task} {...props} />;
      })}
    </>
  );
}
