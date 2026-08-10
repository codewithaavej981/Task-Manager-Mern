function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>

        <span className="status">
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;