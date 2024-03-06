import { Task } from "../../pages/TasksPage/TasksPage";

interface TaskCardProps {
  task: Task;
  fetchData: () => void;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const handleDate = (dueDate: string) => {
    if (dueDate) {
      const formattedDate = dueDate.split("T");
      return formattedDate[0];
    }
    return "No Date Set";
  };

  const handleTime = (dueDate: string) => {
    if (dueDate) {
      const formattedTime = dueDate.split("T");
      const shortTime = formattedTime[1].slice(0, 5);
      return shortTime;
    }
    return "No Time Set";
  };

  const handlePriority = (priority: number) => {
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

  return (
    <div>
      <div>
        <h3>{task.name}</h3>
        <p>{task.description}</p>
        <p>{handleDate(task.dueDate)}</p>
        <p>{handleTime(task.dueDate)}</p>
        <p>{handlePriority(task.priority)}</p>
      </div>
    </div>
  );
};

export default TaskCard;
