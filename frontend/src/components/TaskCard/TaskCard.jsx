import React, { useState } from "react";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import { deleteTask, updateTask } from "../../services/task-services";

const TaskCard = ({ task, fetchData }) => {
  const [modalShown, setModalShown] = useState(false);

  const submitHandler = (data) => {
    console.log(task);
    const taskId = Number(task.id);
    updateTask(taskId, data)
      .then(() => setModalShown(false))
      .catch((e) => console.error(e))
      .finally(fetchData);
  };

  const handleDate = (date) => {
    const formattedDate = date.split("T").join(" ");
    return formattedDate;
  };

  const handlePriority = (priority) => {
    switch (priority) {
      case 1:
        return "No Priority";
      case 2:
        return "Low Priority";
      case 3:
        return "Medium Priority";
      case 4:
        return "High Priority";
      case 5:
        return "Urgent";
      default:
        return "No Priority";
    }
  };

  const handleDelete = () => {
    const taskId = Number(task.id);
    deleteTask(taskId)
      .then(console.log("Delete Successful!"))
      .catch((e) => console.error(e))
      .finally(fetchData);
  };

  return (
    <div>
      <div>
        <h3>{task.name}</h3>
        <p>{task.description}</p>
        <p>{handleDate(task.dueDate)}</p>
        <p>{handlePriority(task.priority)}</p>
        <button onClick={() => setModalShown(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <EditTaskModal
        modalShown={modalShown}
        setModalShown={setModalShown}
        task={task}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default TaskCard;
