import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeContext } from "../pages/SiteWrap";

export default function AppContainer(){
  const {isDarkMode, toggleTheme} = useContext(ThemeContext)
  const [background, setBackground] = useState()
  const location = useLocation()

  useEffect(() => {
    if(location.pathname === "/"){
      return setBackground("app-container app-container-transparent")
    } else if(location.pathname !== "/" && isDarkMode) {
      return setBackground("app-container")
    } else if(location.pathname !== "/" && !isDarkMode) {
      return setBackground("app-container app-container-lightmode")
    }
  }, [location, isDarkMode])

  return (
    <div className={background}>
      <Outlet />
    </div>
  )
}