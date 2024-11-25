import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskTimer from './components/TaskTimer';
import Analytics from './components/Analytics';

function App() {
    const [tasks, setTasks] = useState([]);

    // Load tasks from local storage on initial render
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    // Save tasks to local storage whenever 'tasks' changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    // Function to add a new task
    const addTask = (newTask) => {
        const taskWithId = { ...newTask, id: Date.now() }; // Use current timestamp as ID
        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks, taskWithId];
            console.log(updatedTasks);
            return updatedTasks;
        });
    };

    // Function to delete a task
    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    // Function to update task time
    const updateTaskTime = (taskId, timeSpent) => {
        setTasks(prevTasks => 
            prevTasks.map(task => task.id === taskId ? { ...task, timeSpent } : task)
        );
    };

    return (
        <div>
            <TaskList tasks={tasks} addTask={addTask} deleteTask={deleteTask} updateTaskTime={updateTaskTime} />
            {tasks.map(task => (
                <TaskTimer key={task.id} task={task} updateTimeSpent={updateTaskTime} />  
            ))}
            <Analytics tasks={tasks} />
        </div>
    );
}

export default App;