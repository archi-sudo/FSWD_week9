import { useState } from "react";
import "./todolist.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">To-Do List</h2>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="todo-input"
        />
        <button onClick={addTask} className="add-btn">
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-message">No tasks yet. Add one!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <span>{task}</span>
              <button onClick={() => removeTask(index)} className="remove-btn">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoList;
