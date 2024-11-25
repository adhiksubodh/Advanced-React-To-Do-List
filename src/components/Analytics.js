import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Analytics({ tasks }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Time Spent (minutes)',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        if (!tasks || tasks.length === 0) return; // checks if tasks is empty or undefined 

        const taskLabels = tasks.map(task => task.title);
        const timeData = tasks.map(task => (typeof task.timeSpent === 'number' ? task.timeSpent : 0));

        setChartData({
            labels: taskLabels,
            datasets: [
                {
                    label: 'Time Spent (minutes)',
                    data: timeData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        });
    }, [tasks]);

    return (
        <div>
            <h2>Analytics</h2>
            <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
        </div>
    );
}

export default Analytics;