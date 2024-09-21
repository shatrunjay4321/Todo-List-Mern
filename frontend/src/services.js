import axios from 'axios';

const TODO_API_URL = 'http://localhost:3001/todos';
const AUTH_API_URL = 'http://localhost:3001/auth';

const getAuthHeaders = (token) => ({
    headers: { Authorization:token },
});

export const getTodos = (token) => axios.get(TODO_API_URL, getAuthHeaders(token));
export const addTodo = (task, token) => axios.post(TODO_API_URL, { task }, getAuthHeaders(token));
export const editTodo = (id, task, isCompleted, token) => axios.put(`${TODO_API_URL}/${id}`, { task, isCompleted }, getAuthHeaders(token));
export const deleteTodo = (id, token) => axios.delete(`${TODO_API_URL}/${id}`, getAuthHeaders(token));

export const login = (data) => axios.post(`${AUTH_API_URL}/login`, data);
export const signup = (data) => axios.post(`${AUTH_API_URL}/signup`, data);
