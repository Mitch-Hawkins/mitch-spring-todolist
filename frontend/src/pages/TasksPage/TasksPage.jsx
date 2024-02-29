import React, { useEffect, useState } from "react";
import { getAllTasks } from "../../services/task-services";
import TaskCard from "../../components/TaskCard/TaskCard";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <h1>TasksPage</h1>
      <div>
        {!loading &&
          tasks.map((task) => {
            return <TaskCard key={task.id} task={task} fetchData={fetchData} />;
          })}
      </div>
      {/* <EditPostModal /> */}
    </div>
  );
};

export default TasksPage;
