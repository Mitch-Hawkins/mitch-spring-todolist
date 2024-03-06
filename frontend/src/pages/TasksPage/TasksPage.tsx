import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../../services/task-services";
import TaskCard from "../../components/TaskCard/TaskCard";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    getAllTasks()
      .then((res) => setTasks(res))
      .catch((e: Error) => console.warn(e.message))
      .finally(() => setLoading(false));
  };

  const submitHandler = (data: Task) => {
    if (modalMethod == ModalVariant.Update) {
      const taskId = Number(modalData?.id);
      if (!isNaN(taskId)) {
        updateTask(taskId, data)
          .then(() => setModalShown(false))
          .catch((e: Error) => console.error(e))
          .finally(fetchData);
      }
    } else if (modalMethod == ModalVariant.Create) {
      createTask(data)
        .then(() => setModalShown(false))
        .catch((e: Error) => console.error(e))
        .finally(fetchData);
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

  return (
    <div>
      <h1>TasksPage</h1>
      <div>
        <button onClick={handleAdd}>Add Task</button>
        {!loading &&
          tasks.map((tsk) => {
            return (
              <>
                <TaskCard key={tsk.id} task={tsk} fetchData={fetchData} />
                <button
                  onClick={() => {
                    handleEdit(tsk);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(tsk)}>Delete</button>
              </>
            );
          })}
      </div>
      {modalShown && (
        <EditTaskModal
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
