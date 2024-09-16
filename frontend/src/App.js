import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getTodos, addTodo, editTodo, deleteTodo } from './services.js';
import './App.css'

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [markAll, setMarkAll] = useState(false);
  const input = useRef();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = useCallback(async () => {
    if (!newTask.trim()) return;

    try {
      const response = await addTodo(newTask);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setNewTask('');
    } catch (err) {
      console.error("Error adding todo", err);
    }
  }, [newTask]);

  const handleUpdateTodo = useCallback(async () => {
    if (!newTask.trim()) return;

    try {
      const response = await editTodo(currentTodo?._id, newTask, currentTodo?.isCompleted);
      setTodos((prevTodos) => prevTodos.map((todo) =>
        todo._id === currentTodo._id ? response.data : todo
      ));
      setIsEditing(false);
      setNewTask('');
      setCurrentTodo(null);
    } catch (err) {
      console.error("Error updating todo", err);
    }
  }, [currentTodo, newTask]);

  const handleDeleteTodo = useCallback(async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      setIsEditing(false);
      setNewTask("");
      setCurrentTodo(null);
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  }, []);

  const handleCompleteToggle = useCallback(async (todo) => {
    try {
      const updatedTodo = await editTodo(todo._id, todo.task, !todo.isCompleted);
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t._id === todo._id ? updatedTodo.data : t))
      );
    } catch (err) {
      console.error("Error toggling todo", err);
    }
  }, []);

  const handleEditTodo = (todo) => {
    input.current.focus();
    setIsEditing(true);
    setCurrentTodo(todo);
    setNewTask(todo?.task);
  };

  const handleMarkAll = (todos) => {
    setMarkAll((prev) => !prev);
      todos.forEach((todo) => {
        const editTask = async (todo) => {
          try {
            await editTodo(todo._id, todo.task, !todo.isCompleted);
          } catch (e) {
            console.error(e);
          }
        }
        editTask(todo);
     });
     setTodos(todos.map((todo) => ({...todo, isCompleted: !todo.isCompleted})))
  }
        

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          ref={input}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={isEditing ? handleUpdateTodo : handleAddTodo}>
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
        <button onClick={() => handleMarkAll(todos)}>
          {markAll ? 'Unmark All' : 'Mark All'}
        </button>
      </div>

      <ul className='list_container'>
        {todos.map((todo) => (
          <li key={todo._id}>
            <div  className='list'>
              <span
                style={{
                  textDecoration: todo.isCompleted ? 'line-through' : 'none',
                }}
              >
                {todo.task}
              </span>
              <div>
                <button onClick={() => handleCompleteToggle(todo)}>
                  {todo.isCompleted ? 'Unmark' : 'Complete'}
                </button>
                <button onClick={() => handleEditTodo(todo)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
