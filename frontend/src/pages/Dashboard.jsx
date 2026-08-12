import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  // GET TASKS
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get("/tasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setTasks(response.data.tasks);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTasks();
  }, []);

  // CREATE
  async function addTask(taskData) {
    try {
      const response = await api.post("/tasks", taskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTasks((prev) => [response.data.task, ...prev]);
    } catch (error) {
      console.error(error);
    }
  }

  // UPDATE
  async function updateTask(id, updatedData) {
    try {
      const response = await api.put(`/tasks/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? response.data.task : task
        )
      );

      setEditingTask(null);
    } catch (error) {
      console.error(error);
    }
  }

  // COMPLETE / UNDO
  async function toggleTask(id) {
    const task = tasks.find((task) => task._id === id);

    if (!task) return;

    await updateTask(id, {
      completed: !task.completed,
    });
  }

  // DELETE
  async function deleteTask(id) {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );

      if (editingTask?._id === id) {
        setEditingTask(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // SEARCH + FILTER
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

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
      <Navbar />

      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <h2>My Tasks</h2>
            <p>Manage your daily tasks</p>
          </div>
        </div>

        <TaskForm
          onAddTask={addTask}
          editingTask={editingTask}
          onUpdateTask={updateTask}
          onCancelEdit={() => setEditingTask(null)}
        />

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

        <div className="task-stats">
          <span>Total: {tasks.length}</span>
          <span>Completed: {completedCount}</span>
          <span>Pending: {pendingCount}</span>
        </div>

        <div className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={setEditingTask}
              />
            ))
          ) : (
            <p className="empty">No tasks found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;