import TaskView from "@/components/Task/View";
import useTasks, { TaskContext } from "@/hooks/useTasks";

export default function Home() {
  return (
    <>
      <TaskContext.Provider value={useTasks()}>
        <TaskView />
      </TaskContext.Provider>
    </>
  );
}
