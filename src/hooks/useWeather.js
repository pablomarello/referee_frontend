import { useEffect, useState } from "react";
import { getWeatherByCity } from "../services/weather.api";

export const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getWeatherByCity(city);
        setWeather(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo obtener el clima");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
};