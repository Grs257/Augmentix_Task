import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskValue, setEditingTaskValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addTask = () => {
    axios
      .post("http://localhost:5000/tasks", { title: newTask })
      .then((res) => {
        setTasks([...tasks, res.data]);
        toast.success("Task succesfully added");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Some error Occured");
      });
    setNewTask("");
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
        toast.success("Task deleted added");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Some error Occured");
      });
  };

  const toggleTask = (id) => {
    const task = tasks.find((task) => task._id === id);
    axios
      .put(`http://localhost:5000/tasks/${id}`, { completed: !task.completed })
      .then((res) =>
        setTasks(tasks.map((task) => (task._id === id ? res.data : task)))
      )
      .catch((err) => {
        console.error(err);
        toast.error("Some error Occured");
      });
  };

  const startEditing = (id, title) => {
    setEditingTaskId(id);
    setEditingTaskValue(title);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTaskValue("");
  };

  const saveTask = (id) => {
    axios
      .put(`http://localhost:5000/tasks/${id}`, { title: editingTaskValue })
      .then((res) => {
        setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
        setEditingTaskId(null);
        setEditingTaskValue("");
        toast.success("Task succesfully updated");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Some error Occured");
      });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTaskId === task._id ? (
              <>
                <input
                  type="text"
                  value={editingTaskValue}
                  onChange={(e) => setEditingTaskValue(e.target.value)}
                />
                <button onClick={() => saveTask(task._id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
                <button onClick={() => toggleTask(task._id)}>Toggle</button>
                <button onClick={() => startEditing(task._id, task.title)}>
                  Edit
                </button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
