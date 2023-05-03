import { FaTrashAlt } from "react-icons/fa";
import styles from "@/styles/TaskDetails.module.css";
import { Task } from "@/types/Task";
import { useRouter } from "next/router";

type TaskDetailsControlsProps = {
  task: Task;
  deleteTask: Function;
};

export default function TaskDetailsControls(props: TaskDetailsControlsProps) {
  const router = useRouter();
  const handleDelete = () => {
    props.deleteTask(props.task);
    router.reload();
  };

  return (
    <div className={styles.controlContainer}>
      <FaTrashAlt className={styles.trashIcon} onClick={() => handleDelete()} />
    </div>
  );
}
