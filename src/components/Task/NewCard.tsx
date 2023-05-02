import styles from "@/styles/TaskCard.module.css";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useState, Ref } from "react";

type TaskNewCardProps = {
  inputFocus: Function;
  inputRef: Ref<HTMLInputElement>;
};

export default function TaskNewCard(props: TaskNewCardProps) {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div className={styles.taskCard} onClick={() => props.inputFocus()}>
      <div>
        {selected ? (
          <FaCheckCircle
            className={`${styles.checkmark} ${styles.checkmarkSelected}`}
          />
        ) : (
          <FaPlusCircle
            className={styles.checkmark}
            onClick={() => setSelected(!selected)}
          />
        )}
      </div>

      <div className={styles.taskHeader}>
        <input
          value={""}
          onChange={(e: any) => console.log("A")}
          placeholder="Add a task"
          onFocus={() => setSelected(true)}
          ref={props.inputRef}
        />
      </div>
    </div>
  );
}
