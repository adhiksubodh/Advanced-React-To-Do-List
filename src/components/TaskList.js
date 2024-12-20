import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskTimer from './TaskTimer';

function TaskList({ tasks, addTask, deleteTask, updateTaskTime}) {
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



    return (
        <div>
            <h2>Your Tasks</h2>

            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                />
                <button type="submit">Add Task</button>
            </form>
            
            {tasks && tasks.length > 0 ? (
             tasks.map(task => (
                <div key={task.id}>
                    <TaskItem task={task} deleteTask={deleteTask} />
                    <TaskTimer task={task} updateTimeSpent={updateTaskTime} />
                </div>
            ) )
            ) : ( 
                <p>No tasks available. </p>
            )}
        </div>
    );
            }
export default TaskList;
