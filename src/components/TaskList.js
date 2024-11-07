import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskTimer from './TaskTimer';

function TaskList({ tasks, addTask, deleteTask }) {
    const [taskTitle, setTaskTitle] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        
        // Add only if there is a title
        if (taskTitle.trim() === '') {
            return;
        }

        // Create a new task object
        const newTask = {
            id: Date.now(), // Unique ID
            title: taskTitle,
            isComplete: false,
            timeSpent: 0, // Time tracking for pomodoro
        };

        // Call addTask from props to add a new task
        addTask(newTask);  // **Updated this call**

        // Clear input field
        setTaskTitle('');
    };

    // Function to update time spent on a task
    const updateTimeSpent = (taskId, timeSpent) => {
        // Update the task's timeSpent value
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, timeSpent } : task
        );
        // Use addTask to set the updated tasks list
        addTask(updatedTasks);  // **Updated this call**
    };

    return (
        <div>
            <h2>Your Tasks</h2>

            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>

            {tasks.map(task => (
                <div key={task.id}>
                    <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
                    <TaskTimer task={task} updateTimeSpent={updateTimeSpent} />
                </div>
            ))}
        </div>
    );
}

export default TaskList;
