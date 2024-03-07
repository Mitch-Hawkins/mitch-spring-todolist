import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditTaskModal from "./EditTaskModal";
import { ModalVariant } from "../../pages/TasksPage/TasksPage";

const mockTask = {
  id: 1,
  name: "Test",
  description: "Description",
  dueDate: "2000-01-01T12:00:00",
  priority: 3,
};

const mockModal = {
  modalShown: true,
  setModalShown: () => {},
  modalMethod: ModalVariant.Create,
  modalData: mockTask,
  submitHandler: () => {},
};

describe("Edit Task Modal component tests", () => {
  it("Should render without a fuss", () => {
    render(
      <EditTaskModal
        modalShown={mockModal.modalShown}
        setModalShown={mockModal.setModalShown}
        modalMethod={mockModal.modalMethod}
        modalData={mockModal.modalData}
        submitHandler={mockModal.submitHandler}
      />
    );
    const modal = screen.getByText("Create Task");
    expect(modal).toBeInTheDocument();
  });
});
