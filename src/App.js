import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskTimer from './components/TaskTimer';
import Analytics from './components/analytics';

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

  // Function to add a new task
  const addTask = (newTask) => {
    setTasks(prevTasks => {
      if (Array.isArray(newTask)) {
        return newTask;  // If we're updating, return the updated list
      } else {
        return [...prevTasks, newTask];  // Adding a new task
      }
    });
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <TaskList tasks={tasks} addTask={addTask} deleteTask={deleteTask} />
      <TaskTimer tasks={tasks} setTasks={setTasks} />
      <Analytics tasks={tasks} />
    </div>
  );
}

export default App;
