import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../pages/SiteWrap";
import useWeatherIcons from "../weather-icons";
import search_icon from "../assets/search.png";
import currentlocation_icon from "../assets/currentlocation.png";
import sunrise_icon from "../assets/sunrise.png";
import sunset_icon from "../assets/sunset.png";
import "./WeatherApp.css";

export default function WeatherPage() {
  const [wicon, setWicon] = useState();
  const [searchCity, setSearchCity] = useState("");
  const [weather, setWeather] = useState();
  const {location} = useContext(ThemeContext)
  const {icons} = useWeatherIcons()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState(location?.longitude)
  const [error, setError] = useState("")
  const formatTime = (timestamp) => {
    const dateObj = new Date(timestamp * 1000);
    const hours = dateObj.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  let sunriseFormatted = formatTime(weather?.sys.sunrise);
  let sunsetFormatted = formatTime(weather?.sys.sunset);

  const iconMapping = {
    "01d": icons.clearday_icon,
    "01n": icons.clearnight_icon,
    "02d": icons.fewcloudsday_icon,
    "02n": icons.fewcloudsnight_icon,
    "03d": icons.scatteredclouds_icon,
    "03n": icons.scatteredclouds_icon,
    "04d": icons.brokencloudsday_icon,
    "04n": icons.brokencloudsnight_icon,
    "09d": icons.lightrainday_icon,
    "09n": icons.lightrainnight_icon,
    "10d": icons.rain_icon,
    "10n": icons.rain_icon,
    "11d": icons.thunderstorm_icon,
    "11n": icons.thunderstorm_icon,
    "13d": icons.snow_icon,
    default: icons.fewcloudsday_icon,
  };

  // Coordinates are dynamically fetched (start value is current location)

  useEffect(() => {
    if(!location) return
    setLatitude(() => location.latitude)
    setLongitude(() => location.longitude)
  }, [location])

  // Handle search from input field and change coordinates to queried city

  async function handleSearch(){
    setError()
    if(searchCity === "") return
    try {
      let city = searchCity.trim();
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.VITE_API}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setWeather(() => data);
      setLatitude(() => data.coord.lat)
      setLongitude(() => data.coord.lon)
      setSearchCity("")
    } catch (error) {
      console.error(error);
      setError(() => "Location not found!")
    }
  };

  // Reset back to current location when clicking location button

  function handleCurrentLocation(){
    setError("")
    setLatitude(() => location.latitude)
    setLongitude(() => location.longitude)
  }

  // Fetch weather depending on coordinates

  async function fetchWeatherByLocation(lat, lon) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.VITE_API}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    setWeather(() => data);
    setWicon(() => data.weather[0].icon);
  }

  // Refresh weather data every 5 minutes for the current location (coordinates)

  useEffect(() => {
    if (!location) return;
    if(!latitude ||!longitude) return;
    fetchWeatherByLocation(latitude, longitude);
    const interval = setInterval(() => {
      fetchWeatherByLocation(latitude, longitude);
    }, 300000);

    return () => clearInterval(interval);
  }, [location, latitude, longitude]);


  return (
    <>
    {weather ? 
    <div className="weather-container">
    <div className="top-bar">
    <button className="currentlocation-icon" onClick={handleCurrentLocation} title="Get your current locations weather">
        <img src={currentlocation_icon} alt="" />
      </button>
      <input
        type="text"
        className="cityInput"
        placeholder="Search"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />
      <button className="search-icon" onClick={handleSearch}>
        <img src={search_icon} alt="" />
      </button>
    </div>
    <div className="weather-image">
    <img
        src={iconMapping[`${wicon}`] || iconMapping.default}
        alt=""
      />
    </div>
    <div className="weather-temp">
    {!error ? `${Math.round(weather?.main.temp)}\u00B0C` : `--`}
      
    </div>
    <div className="weather-location">{!error ? weather?.name  : `${error}`}, {!error && weather?.sys.country }</div>
    
    <div className="data-container">
      <div className="element">
        <img src={sunrise_icon} alt="" className="icon" />
        <div className="data">
          <div className="text">Sunrise</div>
          <div className="sunrise">{sunriseFormatted}</div>
        </div>
      </div>
      <div className="element">
        <img src={sunset_icon} alt="" className="icon" />
        <div className="data">
          <div className="text">Sunset</div>
          <div className="sunset">{sunsetFormatted}</div>
        </div>
      </div>
    </div>
  </div> : <span>Loading...</span>}
    </>
  )
}