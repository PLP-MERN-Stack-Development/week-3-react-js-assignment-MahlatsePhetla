

import React, { useState } from "react";


function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleCompleted = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    
    return true;
  });

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Task Manager</h1>

     <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-4">

        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}
        >
          Completed
        </button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <li className="text-center text-gray-500 dark:text-gray-300">No tasks</li>
        ) : (
          filteredTasks.map(task => (
            <li key={task.id} className="flex items-center justify-between p-2 bg-gray-100 rounded dark:bg-gray-700">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task.id)}
                />
                <span
                  className={`text-gray-800 dark:text-white ${task.completed ? "line-through text-gray-500" : ""}`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TaskManager;
