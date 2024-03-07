import { render, screen } from "@testing-library/react";
import TaskCard from "./TaskCard";
import "@testing-library/jest-dom";

const mockTask = {
  id: 1,
  name: "Test",
  description: "Description",
  dueDate: "2000-01-01T12:00:00",
  priority: 3,
};

const emptyTask = {
  id: 1,
  name: "Test",
  description: "Description",
  dueDate: "",
  priority: 0,
};

const noPriorityTask = {
  id: 1,
  name: "Test",
  description: "Description",
  dueDate: "",
  priority: 1,
};

const lowPriorityTask = {
  id: 1,
  name: "Test",
  description: "Description",
  dueDate: "",
  priority: 2,
};
const mediumPriorityTask = {
  id: 1,
  name: "Test",
  description: "Description",
  dueDate: "",
  priority: 3,
};
const highPriorityTask = {
  id: 1,
  name: "Test",
  description: "Description",
  dueDate: "",
  priority: 4,
};
const urgentTask = {
  id: 1,
  name: "Test",
  description: "Description",
  dueDate: "",
  priority: 5,
};

describe("Task Card component tests", () => {
  it("Should render on load without a fuss", () => {
    render(
      <TaskCard
        task={mockTask}
        fetchData={() => {}}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
    );
    const name = screen.getByText("Test");
    expect(name).toBeInTheDocument();
  });
  it("Should display the correct date", () => {
    render(
      <TaskCard
        task={mockTask}
        fetchData={() => {}}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
    );
    const date = screen.getByTestId("date");
    expect(date).toHaveTextContent("2000-01-01");
  });
  it("Should handle the error if the date is not present", () => {
    render(
      <TaskCard
        task={emptyTask}
        fetchData={() => {}}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
    );
    const date = screen.getByTestId("date");
    expect(date).toHaveTextContent("No Date Set");
  });
  it("Should display the correct time", () => {
    render(
      <TaskCard
        task={mockTask}
        fetchData={() => {}}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
    );
    const time = screen.getByTestId("time");
    expect(time).toHaveTextContent("12:00");
  });
  it("Should display the correct priority", () => {
    const { rerender } = render(
      <TaskCard
        task={noPriorityTask}
        fetchData={() => {}}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
    );
    const priority = screen.getByTestId("priority");
    expect(priority).toHaveTextContent("No Priority");
    rerender(
      <TaskCard
        task={lowPriorityTask}
        fetchData={() => {}}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
    );
    expect(priority).toHaveTextContent("Low Priority");
    rerender(
      <TaskCard
        task={mediumPriorityTask}
        fetchData={() => {}}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
    );
    expect(priority).toHaveTextContent("Medium Priority");
    rerender(
      <TaskCard
        task={highPriorityTask}
        fetchData={() => {}}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
    );
    expect(priority).toHaveTextContent("High Priority");
    rerender(
      <TaskCard
        task={urgentTask}
        fetchData={() => {}}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
    );
    expect(priority).toHaveTextContent("Urgent");
  });
});
