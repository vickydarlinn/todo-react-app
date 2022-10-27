import React, { useState } from "react";
import "./style.css";
import { v4 as uuid } from "uuid";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editedId, setEditedId] = useState(0);

  function submitHandler() {
    if (editedId) {
      const editTask = todos.find((todo) => todo.id === editedId);
      const editedTasksArr = todos.map((todo) => {
        if (todo.id === editedId) {
          return {
            id: todo.id,
            task: newTodo,
          };
        } else {
          return {
            id: todo.id,
            task: todo.task,
          };
        }
      });

      setTodos(editedTasksArr);
      setEditedId(0);
      setNewTodo("");
      return;
    }
    setTodos((oldarr) => {
      return [
        ...oldarr,
        {
          id: uuid(),
          task: newTodo,
        },
      ];
    });
    setNewTodo("");
  }
  function handleKeyPress(e) {
    if (e.charCode === 13) {
      submitHandler();
    }
  }
  function handlerDelete(id) {
    setTodos((oldTodos) => oldTodos.filter((oldTodo) => oldTodo.id !== id));
  }
  function handlerEdit(id) {
    setEditedId(id);
    const editTask = todos.find((todo) => todo.id === id);
    setNewTodo(editTask.task);
  }
  const tasks = todos.map((task) => {
    return (
      <div key={task.id} className="todo">
        <p className="todoWork">{task.task}</p>
        <div className="btn">
          <button className="edit" onClick={() => handlerEdit(task.id)}>
            edit
          </button>
          <button className="delete" onClick={() => handlerDelete(task.id)}>
            delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="app">
      <h1>ToDo app</h1>
      <div className="search">
        <input
          onChange={(e) => setNewTodo(e.target.value)}
          type="text"
          value={newTodo}
          onKeyPress={handleKeyPress}
        />
        <button onClick={submitHandler} className="add">
          {editedId ? "edit" : "add"}
        </button>
      </div>
      <div className="todos">{tasks}</div>
    </div>
  );
}

export default App;
