import React, { useState, useEffect } from "react";
let timeIntervalId;
export default function Timer({ gameOver, restart}) {
    let [time, setTime] = useState(0);

    // useEffect (()=> {
    //     console.log(restart);
    //     if(restart){
    //         setTime(0);
    //     }
    // },[restart]);

    useEffect(() => {
        function incrementTime() {
            setTimeout(() => {
                
                let newTime = time + 1;
                setTime(newTime);
                
            }, 1000);
        }
        if(!gameOver){
            incrementTime();
        } else{ 
            setTime(0);
        }
    }, [time, gameOver,restart]);


    console.log(timeIntervalId);
    return (
        <div style={{ color: "white", fontSize: 20, background: "maroon" }}>
            <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>
                ⏰
            </span>
            {time}
        </div>
    );
}