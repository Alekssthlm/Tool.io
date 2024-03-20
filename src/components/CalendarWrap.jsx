import { useContext, useEffect, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage";
import { ThemeContext } from "../pages/SiteWrap";

export default function CalendarWrap({selectedDate, setHasValues}){ 
  const {isDarkMode} = useContext(ThemeContext)
  const [newTask, setNewTask] = useState('')    //value from text input
  const [taskList, setTaskList] = useLocalStorage('CALENDAR-TASKS',[])
  const [currentTasks, setCurrentTasks] = useState([])

  useEffect(() =>{  // Filters the tasks that match the selected day on the calendar in a new array
    setCurrentTasks(
      taskList.filter(task => {
        return task.date === selectedDate
      })
    )
  }, [taskList, selectedDate])

  useEffect(() => {
    setHasValues(() => {
      return taskList})
  }, [currentTasks])

  function handleAddTask(){  //Adds task to local storage with right properties
    if(newTask === '') return
    setTaskList((currentList) => {
      return [...currentList, {date: selectedDate, task: newTask, id:crypto.randomUUID()}]
    })
    setNewTask('')
  }

  function handleDeleteTask(id){ // 
    const filteredArray = taskList.filter(item => {
      return item.id !== id  //keeps only the items that dont match the id and returns a new array
    })

    setTaskList(() => {
      return filteredArray  //saves the new list without the item we delete
    })
  }

  return (
    <div className='calendar-events'>
      {selectedDate === undefined ? <p className={isDarkMode ? "calendar-title" : "calendar-title calendar-title-light"}>Select a date</p> : <p className={isDarkMode ? "calendar-title" : "calendar-title calendar-title-light"}>{`Schedule for ${selectedDate}`}</p>}
      <div className="calendar-input-wrap">
      <input type="text" className={isDarkMode ? "calendar-input" : "calendar-input calendar-input-light"} placeholder="New task" value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}/>
      <button className="calendar-btn" onClick={handleAddTask}>+</button>
      </div>
      <ul className={isDarkMode ? "calendar-task-list" : "calendar-task-list calendar-task-list-light"}>
        {currentTasks.length === 0 ? <p style={{padding: "0.4rem 0.2rem", textShadow:"1px 1px 10px rgba(0, 0, 0, 0.424)"}}>Nothing scheduled</p> :
        currentTasks.map(task => {
          return <CalendarItem task={task.task} key={task.id} id={task.id} onDelete={handleDeleteTask} />
        })
        }
      </ul>
      </div>
  )
}

function CalendarItem({task, id, onDelete}){  //secondary component defined in the same page, used right above
  const {isDarkMode} = useContext(ThemeContext)

  return (
    <li className={isDarkMode ? "todo-wrap-calendar" : "todo-wrap-calendar todo-wrap-calendar-light"}>
      <label className="calendar-task-label">
        <span> {task}</span>
      </label>
        <button
          className="delete-button"
          onClick={() => {
            onDelete(id);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
    </li>
  );
}