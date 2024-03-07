import { useEffect, useState } from "react";
import { Task } from "../../pages/TasksPage/TasksPage";
import styles from "./TaskCard.module.scss";

export interface TaskCardProps {
  task: Task;
  fetchData: () => void;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    console.log("meep");
  }, [isChecked]);

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

  const classesToAdd = (): string => {
    const classes: string[] = [styles.container];
    if (isChecked) {
      classes.push(styles.checked);
    }
    return classes.join(" ");
  };

  return (
    <div className={classesToAdd()}>
      <div>
        <h3>{task.name}</h3>
        <p>{task.description}</p>
        <p data-testid="date">{handleDate(task.dueDate)}</p>
        <p data-testid="time">{handleTime(task.dueDate)}</p>
        <p data-testid="priority">{handlePriority(task.priority)}</p>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        ></input>
      </div>
    </div>
  );
};

export default TaskCard;
