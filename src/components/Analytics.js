import React, { useEffect, useState } from "react";
import { Bar} from 'react-chartjs-2'

function Analytics({ tasks }) {
    const [ charData, setCharData] = useState({
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
    
    useEffect(() =>{
        const taskLabels = tasks.map(task => task.title);
        const timeData = tasks.map(task => task.timeSpent);
        
        setCharData({
            labels: taskLabels,
            datasets:[
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
            <Bar data={charData} options={{ responsive: true, scales: { y: {beginAtZero: true  }}}}/>
        </div>
    );
}

export default Analytics;