import { Task } from "@/types/Task";

type TaskListProps = {
  tasks: Task[];
  editTask: Function;
  toggleEditMode: Function;
  deleteTask: Function;
  markTaskComplete: Function;
};
export default function TaskList(props: TaskListProps) {
  return (
    <>
      {props.tasks.map((task: Task) => {
        return (
          <div key={task.id}>
            {task.editing ? (
              <input
                type="text"
                value={task.title}
                onChange={(e: any) => props.editTask(e, task)}
              />
            ) : (
              <p>{task.finished ? <s>{task.title}</s> : task.title}</p>
            )}

            <div>
              {task.editing ? (
                <button onClick={() => props.toggleEditMode(task)}>
                  Accept
                </button>
              ) : (
                <button onClick={() => props.toggleEditMode(task)}>Edit</button>
              )}
              <button onClick={() => props.deleteTask(task)}>Delete</button>
              <button onClick={() => props.markTaskComplete(task)}>
                Mark Complete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
