import { useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React",
      description: "Practice React components and hooks",
      completed: false,
    },
    {
      id: 2,
      title: "Build Task Manager",
      description: "Create the frontend of the task manager",
      completed: true,
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  function addTask(task) {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...task,
        completed: false,
      },
    ]);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      <header className="navbar">
        <h1>Task Manager</h1>

        <button className="logout-btn">
          Logout
        </button>
      </header>

      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <h2>My Tasks</h2>
            <p>Manage your daily tasks</p>
          </div>

          <TaskForm onAddTask={addTask} />
        </div>

        <div className="task-controls">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="task-stats">
          <span>Total: {tasks.length}</span>
          <span>
            Completed: {tasks.filter((task) => task.completed).length}
          </span>
          <span>
            Pending: {tasks.filter((task) => !task.completed).length}
          </span>
        </div>

        <div className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          ) : (
            <p className="empty">
              No tasks found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;