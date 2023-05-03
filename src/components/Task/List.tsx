import { Task } from "@/types/Task";
import TaskCard from "./Card";
import TaskNewCard from "./NewCard";
import { Ref, useContext } from "react";
import { TaskContext } from "@/hooks/useTasks";

type TaskListProps = {
  toggleDisplay: Function;
  selectTask: Function;
};

export default function TaskList(props: TaskListProps) {
  const { tasks } = useContext(TaskContext);

  return (
    <>
      <TaskNewCard />
      {tasks.map((task: Task) => {
        return <TaskCard key={task.id} task={task} {...props} />;
      })}
    </>
  );
}
