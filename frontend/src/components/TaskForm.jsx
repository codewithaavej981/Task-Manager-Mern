import { useEffect, useState } from "react";

function TaskForm({
  onAddTask,
  editingTask,
  onUpdateTask,
  onCancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      description: description.trim(),
    };

    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onAddTask(taskData);
    }

    setTitle("");
    setDescription("");
  }

  return (
    <div className="task-form-wrapper">
      <div className="task-form-heading">
        <div>
          <h3>{editingTask ? "Edit Task" : "Add New Task"}</h3>
          <p>
            {editingTask
              ? "Update your task details."
              : "Create a new task to stay organized."}
          </p>
        </div>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="task-title">Task Title</label>

          <input
            id="task-title"
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="task-description">
            Description
          </label>

          <input
            id="task-description"
            type="text"
            placeholder="What needs to be done?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-actions">
          {editingTask && (
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}

          <button type="submit" className="add-task-btn">
            {editingTask ? "Update Task" : "+ Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;