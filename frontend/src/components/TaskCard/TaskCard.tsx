import { useEffect, useState } from "react";
import { Task } from "../../pages/TasksPage/TasksPage";
import trashIcon from "../../assets/icons8-trash-25.png";
import editIcon from "../../assets/icons8-edit-25.png";
import styles from "./TaskCard.module.scss";

export interface TaskCardProps {
  task: Task;
  fetchData: () => void;
  handleEdit: (task: Task) => void;
  handleDelete: (task: Task) => void;
}

const TaskCard = ({ task, handleEdit, handleDelete }: TaskCardProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    console.log("meep");
  }, [isChecked]);

  const handleDate = (dueDate: string) => {
    if (dueDate) {
      const formattedDate = dueDate.split("T");
      return `${formattedDate[0]}`;
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
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
        }}
        className={styles.checkbox}
      ></input>
      <div className={styles.textWrapper}>
        <h3 className={styles.header}>{task.name}</h3>
        <p className={styles.description}>{task.description}</p>
        <div className={styles.dateTimeWrapper}>
          <p data-testid="date">{handleDate(task.dueDate)}</p>
          <p data-testid="time">{handleTime(task.dueDate)}</p>
        </div>
        <p data-testid="priority" className={styles.priority}>
          {handlePriority(task.priority)}
        </p>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => {
            handleEdit(task);
          }}
          className={styles.editButton}
          data-testid="Edit"
        >
          <img src={editIcon} width="20" height="20" />
        </button>
        <button
          onClick={() => handleDelete(task)}
          className={styles.deleteButton}
          data-testid="Delete"
        >
          <img src={trashIcon} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
