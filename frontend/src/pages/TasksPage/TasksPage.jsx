import React, { useEffect, useState } from "react";
import { getAllTasks } from "../../services/task-services";
import TaskCard from "../../components/TaskCard/TaskCard";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks()
      .then((res) => setTasks(res))
      .catch((e) => console.warn(e.message));
  }, []);

  return (
    <div>
      <h1>TasksPage</h1>
      <div>
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
      {/* <EditPostModal /> */}
    </div>
  );
};

export default TasksPage;
