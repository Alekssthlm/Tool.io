import { useState, useEffect } from "react";
import apiKeys from "../config";

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const fetchLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      setLat(latitude);
      setLong(longitude);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeatherData = async (apiURL) => {
    try {
      const response = await fetch(apiURL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setWeatherData(result);

    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    // Check if both lat and long have values
    if (lat !== null && long !== null) {

        fetchWeatherData(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKeys.weather}`
        );
    }
  }, [lat, long]);

  return { weatherData, fetchWeatherData, fetchLocation, lat, long };
};

export default useWeatherData;