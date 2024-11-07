import React from "react";

function TaskItem({ task, deleteTask}) {
    return (
        <div>
            <h3>{task.title}</h3>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
    );
}
export default TaskItem;