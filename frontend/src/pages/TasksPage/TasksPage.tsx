import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../../services/task-services";
// import TaskCard from "../../components/TaskCard/TaskCard";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";
import styles from "./TasksPage.module.scss";
import Header from "../../components/Header/Header";
import TasksContainer from "../../containers/TasksContainer/TasksContainer";

export enum ModalVariant {
  Create = "Create",
  Update = "Update",
}

export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: number;
}

const defaultTask: Task = {
  id: NaN,
  name: "",
  description: "",
  dueDate: "",
  priority: 1,
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalShown, setModalShown] = useState<boolean>(false);
  const [modalMethod, setModalMethod] = useState<ModalVariant | null>(null);
  const [modalData, setModalData] = useState<Task | null>(null);
  // const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    getAllTasks()
      .then((res) => setTasks(res))
      .catch((e: Error) => console.error(e))
      .finally(() => setLoading(false));
  };

  const submitHandler = (data: Task) => {
    if (modalMethod == ModalVariant.Update) {
      const taskId = Number(modalData?.id);
      if (!isNaN(taskId)) {
        setModalShown(false);
        updateTask(taskId, data)
          .then(fetchData)
          .catch((e: Error) => console.error(e));
        // .finally(() => setModalShown(false));
      }
    } else if (modalMethod == ModalVariant.Create) {
      setModalShown(false);
      createTask(data)
        .then(fetchData)
        .catch((e: Error) => console.error(e));
      // .finally(() => setModalShown(false));
    }
  };

  const handleAdd = () => {
    setModalMethod(ModalVariant.Create);
    setModalShown(true);
    setModalData(defaultTask);
  };

  const handleEdit = (task: Task) => {
    setModalMethod(ModalVariant.Update);
    setModalShown(true);
    setModalData(task);
  };

  const handleDelete = (task: Task) => {
    const taskId = Number(task.id);
    deleteTask(taskId)
      .then(() => console.log("Delete Successful!"))
      .catch((e: Error) => console.error(e))
      .finally(fetchData);
  };

  // console.log(error);

  return (
    <div className={styles.container} data-testid="TasksPage">
      <Header />
      <div className={styles.addButtonContainer}>
        <button onClick={handleAdd} className={styles.addButton}>
          Add Task
        </button>
      </div>
      <div>
        <TasksContainer
          loading={loading}
          tasks={tasks}
          fetchData={fetchData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
      {modalShown && (
        <EditTaskModal
          data-testid="EditTaskModal"
          modalShown={modalShown}
          setModalShown={setModalShown}
          modalMethod={modalMethod}
          submitHandler={submitHandler}
          modalData={modalData}
        />
      )}
    </div>
  );
};

export default TasksPage;
