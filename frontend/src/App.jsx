import React from "react";
import TaskList from "./components/TaskList";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="dark" />
      <TaskList />
    </div>
  );
}

export default App;
