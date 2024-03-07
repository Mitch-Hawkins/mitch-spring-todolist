import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TasksPage from "./TasksPage";
import userEvent from "@testing-library/user-event";
import { getAllTasks, deleteTask } from "../../services/task-services";

jest.mock("../../components/EditTaskModal/EditTaskModal", () => ({
  default: () => <div data-testid="EditTaskModal" />,
}));

jest.mock("../../services/task-services", () => ({
  updateTask: jest.fn(() => Promise.resolve()),
  createTask: jest.fn(() => Promise.resolve()),
  deleteTask: jest.fn(() => Promise.resolve()),
  getAllTasks: jest.fn(() => Promise.resolve(mockTasks)),
}));

const mockTasks = [
  {
    id: 1,
    name: "Test",
    description: "Description",
    dueDate: "2000-01-01T12:00:00",
    priority: 3,
  },
  // {
  //   id: 2,
  //   name: "Test",
  //   description: "Description",
  //   dueDate: "2000-01-01T12:00:00",
  //   priority: 3,
  // },
];

describe("Task Page componenst Tests", () => {
  it("should render without a fuss", () => {
    render(<TasksPage />);
    const tasksPage = screen.getByTestId("TasksPage");
    expect(tasksPage).toBeInTheDocument();
  });

  it("should open a modal when the add task button is clicked", async () => {
    const rendered = render(<TasksPage />);
    const tasksPage = screen.getByTestId("TasksPage");
    expect(tasksPage).toBeInTheDocument();
    const addButton = rendered.getByText("Add Task");
    const user = userEvent.setup();
    await user.click(addButton);
    expect(screen.queryByTestId("EditTaskModal")).toBeInTheDocument();
  });
  it("should populate with backend tasks", async () => {
    const rendered = render(<TasksPage />);
    const tasksPage = rendered.getByTestId("TasksPage");
    expect(tasksPage).toBeInTheDocument();
    await waitFor(() => {
      expect(getAllTasks).toHaveBeenCalled();
    });
  });
  test("edit button is present after loading tasks", async () => {
    const rendered = render(<TasksPage />);
    await waitFor(() => {}, { timeout: 0 });
    const editButton = rendered.getByTestId("Edit");
    expect(editButton).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(editButton);
    expect(screen.queryByTestId("EditTaskModal")).toBeInTheDocument();
  });
  test("delete button is present after loading tasks", async () => {
    const rendered = render(<TasksPage />);
    await waitFor(() => {}, { timeout: 0 });
    const deleteButton = rendered.getByTestId("Delete");
    expect(deleteButton).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(deleteButton);
    await waitFor(() => {
      expect(deleteTask).toHaveBeenCalled();
    });
  });
});
