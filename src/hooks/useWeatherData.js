// useWeather.js - Custom hook
import { useState, useEffect } from "react";
import {
  getCurrentWeather,
  getHourlyWeather,
  getDailyWeather,
} from "./getWeatherDetails";

export const useWeather = (location) => {
  const [weatherData, setWeatherData] = useState({
    current: null,
    hourly: null,
    daily: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location?.latitude || !location?.longitude) return;

    const fetchAllWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [current, hourly, daily] = await Promise.all([
          getCurrentWeather(location),
          getHourlyWeather(location),
          getDailyWeather(location),
        ]);

        setWeatherData({ current, hourly, daily });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllWeather();
  }, [location?.latitude, location?.longitude]);

  return { weatherData, isLoading, error };
};
