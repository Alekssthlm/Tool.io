import React, { useEffect, useState } from "react";
import useWeatherIcons from "../weather-icons";

export default function TopWeather({ location }) {
  const [wicon, setWicon] = useState();
  const [weather, setWeather] = useState();
  const {icons} = useWeatherIcons()

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

  // Fetch weather by location

  async function fetchWeatherByLocation() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${process.env.API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    setWeather(() => data);
    setWicon(() => data.weather[0].icon);
  }

  useEffect(() => {
    if (!location) return;
    fetchWeatherByLocation();
    const interval = setInterval(() => {
      fetchWeatherByLocation();
    }, 300000);

    return () => clearInterval(interval);
  }, [location]);

  return (
    <>
      <img
        className="header-weather-icon"
        src={iconMapping[`${wicon}`] || iconMapping.default}
        alt=""
      />

      <div className="temperature">
        {weather ? Math.round(weather.main.temp) : "--"} &deg;C
      </div>
    </>
  );
}
