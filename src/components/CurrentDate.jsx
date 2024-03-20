import React, { useEffect, useState } from 'react';

export default function CurrentDate() {
    const [currentDate, setcurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setcurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    //adds st. nd, rd or th to the end of the day
    const addOrdinalSuffix = (day) => {
        if (day >= 11 & day <= 13) {
            return `${day}th`;
        }

        switch (day % 10) {
            case 1:
              return `${day}st`;
            case 2:
              return `${day}nd`;
            case 3:
              return `${day}rd`;
            default:
              return `${day}th`;
          }
    }
    const formattedDate = currentDate.toLocaleString('en-US', options);
    const formattedDay = addOrdinalSuffix(currentDate.getDate());

    return <div>{formattedDate.replace(currentDate.getDate(), formattedDay)}</div>
} 