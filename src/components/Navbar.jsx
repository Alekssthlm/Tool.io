import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../pages/SiteWrap";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)

  return (
    <div className={isDarkMode ? "main-navbar" : "main-navbar main-navbar-lightmode"}>
      <ul className="nav-link-container">
        <li>
          <Link className={isDarkMode ? "nav-links" : "nav-links nav-links-lightmode"} to="/" >Welcome</Link>
        </li>
        <li>
          <Link className={isDarkMode ? "nav-links" : "nav-links nav-links-lightmode"} to="/task-manager" >Tasks</Link>
        </li>
        <li>
          <Link className={isDarkMode ? "nav-links" : "nav-links nav-links-lightmode"} to="/weather" >Weather</Link>
        </li>
        <li>
          <Link className={isDarkMode ? "nav-links" : "nav-links nav-links-lightmode"} to="/calendar" >Calendar</Link>
        </li>
        <li>
          <Link className={isDarkMode ? "nav-links" : "nav-links nav-links-lightmode"} to="/unit-converter" style={{textWrap: 'nowrap'}}>Unit Converter</Link>
        </li>
      </ul>
          <button className={isDarkMode ? "toggle-theme-btn  toggle-theme-btn-light" : "toggle-theme-btn"} onClick={toggleTheme}>{isDarkMode ? <i className="fa-solid fa-sun" style={{color: 'yellow'}}></i> : <i className="fa-solid fa-moon"></i>}</button>
    </div>
  );
}
