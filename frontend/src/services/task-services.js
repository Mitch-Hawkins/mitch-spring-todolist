export const getAllTasks = async () => {
  const response = await fetch("http://localhost:8080/tasks");
  if (!response.ok) {
    throw new Error("Failed to get tasks");
  }
  const data = await response.json();
  return data;
};

export const createTask = async (data) => {
  return await fetch(`http://localhost:8080/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((error) => console.warn(error));
};

export const updateTask = async (id, data) => {
  return await fetch(`http://localhost:8080/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.warn(error));
};

export const deleteTask = async (id) => {
  return await fetch(`http://localhost:8080/tasks/${id}`, { method: "DELETE" })
    .then((res) => console.log(res))
    .catch(() => false);
};
