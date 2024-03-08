import styles from "./TasksContainer.module.scss";
import { Task } from "../../pages/TasksPage/TasksPage";
import TaskCard from "../../components/TaskCard/TaskCard";

interface TasksContainerProps {
  loading: boolean;
  tasks: Task[];
  fetchData: () => void;
  handleEdit: (task: Task) => void;
  handleDelete: (task: Task) => void;
}

const TasksContainer = ({
  loading,
  tasks,
  fetchData,
  handleEdit,
  handleDelete,
}: TasksContainerProps) => {
  return (
    <div className={styles.container}>
      <>
        {tasks && tasks.length === 0 && (
          <p>Nothing To Do! Try adding a task!</p>
        )}
      </>
      {!loading &&
        tasks &&
        tasks.map((tsk) => {
          return (
            <TaskCard
              key={tsk.id}
              task={tsk}
              fetchData={fetchData}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
    </div>
  );
};

export default TasksContainer;
