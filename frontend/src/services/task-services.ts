interface UpdateTaskData {
  name?: string;
  description?: string;
  dueDate?: string;
  priority?: number;
}

interface CreateTaskData {
  name: string;
  description: string;
  dueDate: string;
  priority: number;
}

export const getAllTasks = async () => {
  const response = await fetch("http://localhost:8080/tasks");
  if (!response.ok) {
    throw new Error("Failed to get tasks");
  }
  const data = await response.json();
  return data;
};

export const createTask = async (data: CreateTaskData) => {
  const response = await fetch(`http://localhost:8080/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to Create Task");
  }

  return await response.json();
};

export const updateTask = async (id: number, data: UpdateTaskData) => {
  const response = await fetch(`http://localhost:8080/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to Update Task");
  }

  return await response.json();
};

export const deleteTask = async (id: number) => {
  return await fetch(`http://localhost:8080/tasks/${id}`, { method: "DELETE" })
    .then((res) => console.log(res))
    .catch(() => false);
};
