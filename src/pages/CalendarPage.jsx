import { useEffect, useState } from "react";
import VanillaCalendar from "vanilla-calendar-pro";
import "vanilla-calendar-pro/build/vanilla-calendar.min.css";
import CalendarWrap from "../components/CalendarWrap";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(() => { 
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = month.toString().length === 1 ? `${year}-0${month}-${day.toString().length === 1 ? `0${day}` : day}`: `${year}-${month}-${day.toString().length === 1 ? `0${day}` : day}`  ;
    return currentDate
  });
  const [hasValues, setHasValues] = useState([]) //has same items as taskList from CalendarWrap - all tasks

  useEffect(() => {
    // Options and calendar imported from Vanilla calendar pro library, see documentation
    const options = {
      actions: {
        clickDay(event, self) {
          setSelectedDate(self.selectedDates[0]);
        },
        getDays(day, date, HTMLElement, HTMLButtonElement, self) {
          
          const filteredArray = hasValues.filter(d => {
            return d.date === date
          })

          if(filteredArray.length > 0){

            HTMLButtonElement.style.flexDirection = 'column';
            HTMLButtonElement.innerHTML = `
              <div style="margin: 0; position: relative">${day}<div style="color: orange; position: absolute; bottom: -70%; left:30%; margin: 0">&#8226;</div></div>
              
            `;
          }
        },
        
      },
      date: {
        today: new Date(selectedDate),
      }
    };

    const calendar = new VanillaCalendar("#calendar", options);  //initializes calendar on the website and renders in the div id="calendar" below
    calendar.init();
  }, [hasValues]);


  return (
    <div className="calendar-wrap">
      <div id="calendar"></div>  
      <CalendarWrap selectedDate={selectedDate} setHasValues={setHasValues} />
    </div>
  );
}
