import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [priority, setPriority] = useState("Medium");
const [dueDate, setDueDate] = useState("");
const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");
const [editId, setEditId] = useState(null);
const [editTitle, setEditTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:8085/api/tasks")
      .then((res) => setTasks(res.data));
  };

  const addTask = () => {
  if (title.trim() === "") {
    alert("Enter Task");
    return;
  }

  axios
    .post("http://localhost:8085/api/tasks", {
      title,
      completed: false,
      priority,
      dueDate,
    })
    .then(() => {
      setTitle("");
      setPriority("Medium");
      setDueDate("");
      fetchTasks();
    });
};
 const updateTask = (task) => {
  axios
    .put(`http://localhost:8085/api/tasks/${task.id}`, {
      title: task.title,
      description: task.description,
      completed: !task.completed,
      priority: task.priority,
      dueDate: task.dueDate,
    })
    .then(fetchTasks);
};

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8085/api/tasks/${id}`)
      .then(fetchTasks);
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
  };

 const saveEdit = () => {
  const task = tasks.find((t) => t.id === editId);

  axios
    .put(`http://localhost:8085/api/tasks/${editId}`, {
      title: editTitle,
      description: task.description,
      completed: task.completed,
      priority: task.priority,
      dueDate: task.dueDate,
    })
    .then(() => {
      setEditId(null);
      setEditTitle("");
      fetchTasks();
    });
};

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => {
      if (filter === "Completed") return task.completed;
      if (filter === "Pending") return !task.completed;
      return true;
    });

  return (
    <div
      style={{
        width: "500px",
        margin: "50px auto",
        padding: "20px",
        boxShadow: "0 0 10px #ccc",
        borderRadius: "10px",
        background: "#fff",
      }}
    >
      <h1>Task Manager</h1>

      <button
        onClick={handleLogout}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "75%",
          padding: "8px",
        }}
      />

      <button
        onClick={addTask}
        style={{
          background: "green",
          color: "white",
          border: "none",
          padding: "9px 15px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      >
        Add
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Search Task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
        }}
      />

      <br />
      <br />

      <button onClick={() => setFilter("All")}>All</button>

      <button
        onClick={() => setFilter("Pending")}
        style={{ marginLeft: "5px" }}
      >
        Pending
      </button>

      <button
        onClick={() => setFilter("Completed")}
        style={{ marginLeft: "5px" }}
      >
        Completed
      </button>

      <br />
      <br />

      {filteredTasks.map((task) => (
        <div
          key={task.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #ddd",
          }}
        >
          <div>
            {editId === task.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <button
                  onClick={saveEdit}
                  style={{
                    marginLeft: "5px",
                    background: "green",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <div>
  <div
    style={{
      color: task.completed ? "green" : "black",
      fontWeight: "bold"
    }}
  >
    {task.completed ? "✅" : "⏳"} {task.title}
  </div>

  <div
    style={{
      color:
        task.priority === "High"
          ? "red"
          : task.priority === "Medium"
          ? "orange"
          : "green",
      fontSize: "14px",
      fontWeight: "bold"
    }}
  >
    {task.priority}
  </div>

  <div
    style={{
      fontSize: "13px",
      color: "#666"
    }}
  >
    📅 {task.dueDate || "No Due Date"}
  </div>
</div>
            )}
          </div>

          <div>
            <button
              onClick={() => updateTask(task)}
              style={{
                background: "#FFD700",
                marginRight: "5px",
                border: "none",
                padding: "5px 10px",
              }}
            >
              {task.completed ? "Undo" : "Done"}
            </button>

            <button
              onClick={() => startEdit(task)}
              style={{
                background: "#2563EB",
                color: "white",
                marginRight: "5px",
                border: "none",
                padding: "5px 10px",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              style={{
                background: "#DC2626",
                color: "white",
                border: "none",
                padding: "5px 10px",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default TaskPage;