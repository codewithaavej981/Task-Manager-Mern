import { useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";

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
      description: "Create the task manager frontend",
      completed: true,
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  // CREATE
  function addTask(taskData) {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  }

  // UPDATE
  function updateTask(id, updatedData) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updatedData }
          : task
      )
    );

    setEditingTask(null);
  }

  // COMPLETE / UNDO
  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // DELETE
  function deleteTask(id) {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );

    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  }

  // SEARCH + FILTER
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.filter(
    (task) => !task.completed
  ).length;

  return (
    <div className="app">
      <main className="dashboard">
          <Navbar />
        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h2>My Tasks</h2>
            <p>Manage your daily tasks</p>
          </div>

          <TaskForm
            onAddTask={addTask}
            editingTask={editingTask}
            onUpdateTask={updateTask}
            onCancelEdit={() => setEditingTask(null)}
          />
        </div>

        {/* SEARCH + FILTER */}
        <div className="task-controls">

          <input
          className="srh-task"
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

        {/* STATS */}
        <div className="task-stats">
          <span>Total: {tasks.length}</span>
          <span>Completed: {completedCount}</span>
          <span>Pending: {pendingCount}</span>
        </div>

        {/* TASKS */}
        <div className="task-list">

          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={setEditingTask}
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