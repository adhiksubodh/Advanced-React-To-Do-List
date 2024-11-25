import React from "react";

function TaskItem({ task, deleteTask}) {
    const handleDelete = () => {
        if(window.confirm(`Are you sure you want to delete "${task.title}"?`)){
            deleteTask(task.id);
        }
    };

    return (
        <div>
            <h3>{task.title}</h3>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}
export default TaskItem;