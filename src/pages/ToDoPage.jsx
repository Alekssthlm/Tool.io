import { useContext, useState } from "react";
import ToDoItem from "../components/ToDoItem";
import useLocalStorage from "../hooks/useLocalStorage";
import { ThemeContext } from "./SiteWrap";

export default function ToDoPage() {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useLocalStorage('TODOS', [])
  const {isDarkMode} = useContext(ThemeContext)

  function handleAddTodo(){
    if(newTodo === '') return
    setTodoList(currentList => {
      return [...currentList, {text: newTodo, id: crypto.randomUUID(), checked: false}]
    })
    setNewTodo('')
  }

  function handleDeleteTodo(id){
    const filteredArray = todoList.filter(item => {
      return item.id !== id
    })

    setTodoList(() => {
      return filteredArray
    })
  }

  function toggleTodo(id, checked){
    
    setTodoList(currentTodoList => {
      return currentTodoList.map(todo => {
        if(todo.id === id) return {...todo, checked}

        return todo
      })
    })
  }

  return (
    <div className="task-wrap">
      <div className="input-bar">
        <input className={isDarkMode ? "input-field" : "input-field input-field-light"} type="text" placeholder="New task" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}/>
        <button className="add-todo-btn" onClick={handleAddTodo}>ADD TASK</button>
      </div>

      <ul className="todo-list">
        {todoList.length === 0 ? <p style={isDarkMode ? {color: "#fff"} : {color: "#000", textShadow:"1px 1px 10px rgba(0, 0, 0, 0.424)"}}>All tasks cleared</p> : 
        todoList.map(todo =>{
          return <ToDoItem todo={todo.text} id={todo.id} key={todo.id} checked={todo.checked} toggleTodo={toggleTodo} onDelete={handleDeleteTodo}/>
        })
        }
      </ul>
    </div>
  );
}

