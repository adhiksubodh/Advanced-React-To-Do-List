import React,{ useState, useEffect} from "react";

function TaskTimer({ task , updateTimeSpent}){

    const INITIAL_TIME = 25 * 60 ;
    //timer logic
    const [isRunning , setIsRunning] = useState(false); // control timer
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME); // 25 minutes in seconds
    
    useEffect(() => {
        let id;
        if(isRunning){
             id = setInterval(()=>{
                setTimeLeft(prevTime =>{
                    if(prevTime <=1){
                        clearInterval(id);
                        setIsRunning(false);
                        updateTimeSpent(task.id, INITIAL_TIME ); //update with actal time spent
                        return 0;
                    }
                    return prevTime - 1;
                });
            },1000)

            return () => clearInterval(id); // cleanup interval on component unmount
        } 
        
    },[isRunning,task.id, updateTimeSpent]);
    
    //start/stop the timer
    const toggleTimer = () => {
        setIsRunning(prev => !prev);
    };
    //reset the timer to 25 minutes
    const resetTimer = () =>{
        setIsRunning(false);
        setTimeLeft(INITIAL_TIME);
    
    };     if(!task) return null;

    return   (
        <div>

        <h3>{task.title}</h3>
        <div>
            Time Left: {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
            {(timeLeft % 60).toString().padStart(2,'0')}
        </div>
        <button onClick={toggleTimer} aria-label={isRunning ? 'Pause timer': 'Start timer'}>
            {isRunning? 'Pause' : 'Start'}
    </button>       
    <button onClick={resetTimer} aria-label="Reset timer">Reset</button>
  </div>
    ) ;
}

export default TaskTimer;

