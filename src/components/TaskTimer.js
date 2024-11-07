import React,{ useState, useEffect} from "react";

function TaskTimer({ task , updateTimeSpent}){
    //timer logic
    const [isRunning , setIsRunning] = useState(false); // control timer
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [intervalId, setIntervalId] = useState(null); // hold the setInteerval ID
    
    useEffect(()=>{
        if(isRunning){
            const id = setInterval(()=>{
                setTimeLeft(prevTime =>{
                    if(prevTime <=1){
                        clearInterval(id);
                        setIsRunning(false);
                        updateTimeSpent(task.id, 25*60 - prevTime); //update with actal time spent
                        return 0;
                    }
                    return prevTime - 1;
                });
            },1000)
            setIntervalId(id); // save interval id to clear it later

            return () => clearInterval(id); // cleanup interval on component unmount
        }
        // if timer pause / reset , clear any running interval
        return () =>{
            if(intervalId){
                 clearInterval(intervalId);
            }
        };
    },[isRunning,task.id, updateTimeSpent, intervalId]);
    
    //start/stop the timer
    const toggleTimer = () => {
        setIsRunning(prev => !prev);
    };
    //reset the timer to 25 minutes
    const resetimer = () =>{
        setIsRunning(false);
        setTimeLeft(25*60);
    };
    return (
        <div>

        <h3>{task.title}</h3>
        <div>
            Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0':''}{timeLeft % 60}
        </div>
        <button onClick={toggleTimer}>
            {isRunning ? 'Pause': 'Start'}
    </button>       
    <button onClick={resetimer}>Reset</button>
     {/*timer ui*/}
  </div>
    );
}

export default TaskTimer;

