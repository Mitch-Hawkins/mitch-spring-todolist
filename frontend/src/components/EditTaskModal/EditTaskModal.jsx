import React, { useEffect, useRef } from "react";

const EditTaskModal = ({ modalShown, setModalShown }) => {
  const dialogRef = useRef(null);

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
        <button onClick={() => setModalShown(false)}>X</button>
      </dialog>
    </div>
  );
};

export default EditTaskModal;
