import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ModalVariant, Task } from "../../pages/TasksPage/TasksPage";

interface EditTaskModalProps {
  modalShown: boolean;
  setModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  modalMethod: ModalVariant | null;
  modalData: Task | null;
  submitHandler: (data: Task) => void;
}

const EditTaskModal = ({
  modalShown,
  setModalShown,
  modalMethod,
  modalData,
  submitHandler,
}: EditTaskModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { handleSubmit, register, reset } = useForm<Task>();

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (modalShown && dialogElement) {
      dialogElement.showModal();
    } else if (dialogElement) {
      dialogElement.close();
    }
  }, [modalShown, reset, modalData]);

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
              defaultValue={modalData?.name}
              {...register("name")}
            ></input>
          </div>
          <div>
            <label htmlFor="description">Task Description: </label>
            <input
              type="text"
              id="description"
              defaultValue={modalData?.description}
              {...register("description")}
            ></input>
          </div>
          <div>
            <label htmlFor="date">Task Due Date: </label>
            <input
              type="datetime-local"
              id="date"
              defaultValue={modalData?.dueDate}
              {...register("dueDate")}
            ></input>
          </div>
          <div>
            <label htmlFor="priority">Task Priority: </label>
            <select id="priority" {...register("priority")}>
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
