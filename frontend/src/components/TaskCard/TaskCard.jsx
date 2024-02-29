import React, { useState } from "react";
import EditTaskModal from "../EditTaskModal/EditTaskModal";

const TaskCard = ({ task }) => {
  const [modalShown, setModalShown] = useState(false);

  const handleEdit = () => {
    setModalShown(true);
  };

  return (
    <div>
      <div>
        <h3>{task.name}</h3>
        <p>{task.description}</p>
        <p>{task.dueDate}</p>
        <p>{task.priority}</p>
        <button onClick={handleEdit}>Edit</button>
      </div>
      <EditTaskModal modalShown={modalShown} setModalShown={setModalShown} />
    </div>
  );
};

export default TaskCard;
