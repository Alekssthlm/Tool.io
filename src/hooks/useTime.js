import { useEffect, useState } from "react";

export default function useTime() {
  const [time, setTime] = useState(() => {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    return formatTime(hh) + hh + ":" + formatTime(mm) + mm;
  });

  const [hour, setHour] = useState(() => {
    let date = new Date();
    let hh = date.getHours();
    return hh
  }
  )

  const [minute, setMinute] = useState(() => {
    let date = new Date();
    let mm = date.getHours();
    return mm
  }
  )

  function formatTime(value) {
    if (value < 10) {
      return "0";
    } else {
      return "";
    }
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    setMinute(mm)
    setHour(hh)
    setTime(formatTime(hh) + hh + ":" + formatTime(mm) + mm);
  }

  return { time, hour, minute };
}
