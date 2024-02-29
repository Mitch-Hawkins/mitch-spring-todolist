import React, { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../../services/task-services";
import TaskCard from "../../components/TaskCard/TaskCard";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";

const defaultTask = {
  name: "",
  description: "",
  date: "",
  priority: 1,
};

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [modalMethod, setModalMethod] = useState(null);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    getAllTasks()
      .then((res) => setTasks(res))
      .catch((e) => console.warn(e.message))
      .finally(setLoading(false));
  };

  const submitHandler = (data) => {
    if (modalMethod == "Update") {
      const taskId = Number(modalData.id);
      updateTask(taskId, data)
        .then(() => setModalShown(false))
        .catch((e) => console.error(e))
        .finally(fetchData);
    } else if (modalMethod == "Create") {
      console.log(data);
      createTask(data)
        .then(() => setModalShown(false))
        .catch((e) => console.error(e))
        .finally(fetchData);
    }
  };

  const handleAdd = () => {
    setModalMethod("Create");
    setModalShown(true);
    setModalData(defaultTask);
  };

  const handleEdit = (task) => {
    setModalMethod("Update");
    setModalShown(true);
    setModalData(task);
  };

  const handleDelete = (task) => {
    const taskId = Number(task.id);
    deleteTask(taskId)
      .then(console.log("Delete Successful!"))
      .catch((e) => console.error(e))
      .finally(fetchData);
  };

  return (
    <div>
      <h1>TasksPage</h1>
      <div>
        <button onClick={handleAdd}>Add Task</button>
        {!loading &&
          tasks.map((task) => {
            return (
              <>
                <TaskCard key={task.id} task={task} fetchData={fetchData} />
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task)}>Delete</button>
              </>
            );
          })}
      </div>
      {modalData && (
        <EditTaskModal
          modalShown={modalShown}
          setModalShown={setModalShown}
          modalMethod={modalMethod}
          submitHandler={submitHandler}
          task={modalData}
        />
      )}
    </div>
  );
};

export default TasksPage;
