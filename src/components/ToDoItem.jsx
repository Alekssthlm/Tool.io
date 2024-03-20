import { useContext } from "react";
import { ThemeContext } from "../pages/SiteWrap";

export default function ToDoItem({ todo, id, checked, onDelete, toggleTodo }) {
  const {isDarkMode} = useContext(ThemeContext)

  return (
    <li className={isDarkMode ? "todo-wrap" : "todo-wrap todo-wrap-light"}>
      <label className="todo-label-wrap">
        <input
          className="todo-check"
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            toggleTodo(id, e.target.checked);
          }}
        />
        <span className="todo-item"> {todo}</span>
      </label>
      {checked ? (
        <button
          className="delete-button"
          onClick={() => {
            onDelete(id);
          }}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      ) : null}
    </li>
  );
}
