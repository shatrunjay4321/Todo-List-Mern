import axios from 'axios';

const API_URL = 'http://localhost:3001/api/todos';

export const getTodos = () => axios.get(API_URL);
export const addTodo = (task) => axios.post(API_URL, { task });
export const editTodo = (id, task, isCompleted) => axios.put(`${API_URL}/${id}`, { task, isCompleted });
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
