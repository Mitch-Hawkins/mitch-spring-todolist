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
  try {
    const response = await fetch("http://localhost:8080/tasks");
    if (!response.ok) {
      throw new Error(
        "Failed to get tasks" + `${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("There was a network error. Please try again later!");
    }
    throw error;
  }
};

export const createTask = async (data: CreateTaskData) => {
  try {
    const response = await fetch(`http://localhost:8080/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(
        "Failed to Create Task " + `${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("There was a network error. Please try again later!");
    }
    throw error;
  }
};

export const updateTask = async (id: number, data: UpdateTaskData) => {
  try {
    const response = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(
        "Failed to Update Task " + `${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("There was a network error. Please try again later!");
    }
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  return await fetch(`http://localhost:8080/tasks/${id}`, { method: "DELETE" })
    .then((res) => console.log(res))
    .catch(() => false);
};
