import { createContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AppContainer from "../components/AppContainer";
import CurrentDate from "../components/CurrentDate";
import Footer from "../components/Footer";
import TopWeather from "../components/TopWeather";
import useLocalStorage from "../hooks/useLocalStorage.js";
import useTime from "../hooks/useTime.js";
import useImages from "../hooks/useImages.js";

export const ThemeContext = createContext();

export default function SiteWrap() {
  const { time, hour } = useTime();
  const { changeBackground } = useImages();
  const [isDarkMode, setIsDarkMode] = useLocalStorage("DARKMODE", true);
  const [showMenu, setShowMenu] = useState(false);
  const [location, setLocation] = useState(null);
  const [backgroundSetting, setBackgroundSetting] = useLocalStorage(
    "BACKGROUND-SETTING",
    "theme"
  );

  function toggleTheme() {
    setIsDarkMode((d) => !d);
  }

  // Fetch geolocation

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocation("--")
      })
  }, []);
  


  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, location }}>
      <div
        className="body"
        style={{
          backgroundImage: `url(${changeBackground(
            backgroundSetting,
            isDarkMode,
            hour
          )})`,
        }}
      >
        <header
          className={
            isDarkMode ? "site-header" : "site-header site-header-light"
          }
        >
          <div className="site-header-menu-wrap">
            <div
              className="fa-solid fa-bars menu-btn"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <div className={showMenu ? "settings" : "settings hide-settings"}>
                <p>Change background:</p>
                <div className="settings-group">
                  <div className="setting-option">
                    <input
                      type="radio"
                      name="background-settings"
                      id="theme"
                      value="theme"
                      checked={backgroundSetting === "theme"}
                      onChange={(e) => {
                        setBackgroundSetting(e.target.value);
                      }}
                    />
                    <label htmlFor="theme">By theme</label>
                  </div>
                  <div className="setting-option">
                    <input
                      type="radio"
                      name="background-settings"
                      id="hour"
                      value="hour"
                      checked={backgroundSetting === "hour"}
                      onChange={(e) => {
                        setBackgroundSetting(e.target.value);
                      }}
                    />
                    <label htmlFor="hour">By time of day</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="site-header-widget-wrap">
            <div>{time}</div>
            <CurrentDate />
            <div className="header-weather">
              <TopWeather location={location}/>
            </div>
          </div>
        </header>
        <div className="site-wrap">
          <div className="app-wrap">
            <Navbar />
            <AppContainer />
          </div>
        </div>
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}
