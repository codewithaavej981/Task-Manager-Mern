function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
}) {
  return (
    <div
      className={`task-card ${
        task.completed ? "completed" : ""
      }`}
    >
      <div>
        <h3>{task.title}</h3>

        <p>
          {task.description || "No description"}
        </p>

        <span className="status">
          {task.completed
            ? "Completed"
            : "Pending"}
        </span>
      </div>

      <div className="task-actions">

        <button
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => onEdit(task)}
        >
          Edit
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