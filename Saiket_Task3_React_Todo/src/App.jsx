import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // Start editing a task
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  // Save edited task
  const saveEdit = (id) => {
    if (editText.trim() === "") {
      alert("Task cannot be empty.");
      return;
    }

    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, text: editText } : item
      )
    );

    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>Task Manager</h1>
        <p className="subtitle">React To-Do List</p>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button onClick={addTask} className="add-btn">
            Add Task
          </button>
        </div>

        <div className="task-header">
          <h2>My Tasks</h2>
          <span>{tasks.length} Task(s)</span>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">
              No tasks yet. Add your first task!
            </p>
          ) : (
            tasks.map((item) => (
              <div className="task-item" key={item.id}>
                {editingId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />

                    <button
                      onClick={() => saveEdit(item.id)}
                      className="save-btn"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{item.text}</span>

                    <div className="action-buttons">
                      <button
                        onClick={() => startEdit(item)}
                        className="edit-btn"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTask(item.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;