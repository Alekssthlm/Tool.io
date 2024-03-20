import React, { useEffect, useState } from 'react';
import useTime from '../hooks/useTime';

export default function Time() {
    // const [time, setTime] = useState();
    // function formatTime(value) {
    //     if (value < 10) {
    //       return "0";
    //     } else {
    //       return "";
    //     }
    //   }
    
    //   useEffect(() => {
    //     const timerID = setInterval(() => tick(), 1000);
    
    //     return function cleanup() {
    //       clearInterval(timerID);
    //     };
    //   });
    
    //   function tick() {
    //     let date = new Date();
    //     let hh = date.getHours();
    //     let mm = date.getMinutes();

    //     setTime(formatTime(hh) + hh + ':' + formatTime(mm) + mm);
    //   }
  const { time } = useTime()


    return (
        <div>{time}</div>
    )
}