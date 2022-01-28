const baseUrl = "https://61e1672f63f8fc0017618b99.mockapi.io/api/v1/tasks";

export const getTasksList = () =>
  fetch(`${baseUrl}`).then((response) => response.json());

export const createTask = (taskData) =>
  fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

export const updateTask = (taskId, updatedTaskData) =>
  fetch(`${baseUrl}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTaskData),
  });

export const deleteTask = (taskId) =>
  fetch(`${baseUrl}/${taskId}`, {
    method: "DELETE",
  });
