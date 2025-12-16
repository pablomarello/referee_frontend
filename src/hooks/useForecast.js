import { useEffect, useState } from "react";
import { getForecastByCity } from "../services/weather.api";

export const useForecast = (city, matchDate) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city || !matchDate) return;

    const fetchForecast = async () => {
      try {
        setLoading(true);

        const data = await getForecastByCity(city);

        const matchTime = new Date(matchDate).getTime();

        // buscamos el pronóstico más cercano al horario del partido
        const closestForecast = data.list.reduce((prev, curr) => {
          const prevDiff = Math.abs(new Date(prev.dt_txt).getTime() - matchTime);
          const currDiff = Math.abs(new Date(curr.dt_txt).getTime() - matchTime);
          return currDiff < prevDiff ? curr : prev;
        });

        setForecast(closestForecast);
      } catch (err) {
        console.error(err);
        setError("No se pudo obtener el pronóstico");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city, matchDate]);

  return { forecast, loading, error };
};