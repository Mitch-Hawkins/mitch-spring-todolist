import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const defaultTask = {
  name: "",
  description: "",
  date: "",
  priority: 1,
};

const EditTaskModal = ({
  modalShown,
  setModalShown,
  modalMethod,
  modalData,
  task = defaultTask,
  submitHandler,
}) => {
  const dialogRef = useRef(null);
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (modalShown) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [modalShown]);

  return (
    <div>
      <dialog ref={dialogRef}>
        <header>
          <h3>{modalMethod} Task</h3>
          <button onClick={() => setModalShown(false)}>X</button>
        </header>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label htmlFor="name">Task Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={task.name}
              {...register("name")}
            ></input>
          </div>
          <div>
            <label htmlFor="description">Task Description: </label>
            <input
              type="text"
              id="description"
              name="description"
              defaultValue={task.description}
              {...register("description")}
            ></input>
          </div>
          <div>
            <label htmlFor="date">Task Due Date: </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              defaultValue={task.description}
              {...register("date")}
            ></input>
          </div>
          <div>
            <label htmlFor="priority">Task Priority: </label>
            <select id="priority" name="priority" {...register("priority")}>
              <option value={1}>No Priority</option>
              <option value={2}>Low Priority</option>
              <option value={3}>Medium Priority</option>
              <option value={4}>High Priority</option>
              <option value={5}>Urgent</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </dialog>
    </div>
  );
};

export default EditTaskModal;
