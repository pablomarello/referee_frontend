import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useAssignments } from '../../hooks/useAssignments';
import { useWeather } from '../../hooks/useWeather';
import { useForecast } from '../../hooks/useForecast';


const AsignmentDetail = () => {
  const { id } = useParams();
  const { getAssignmentById } = useAssignments();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  const city = assignment?.match_id?.city;
  const matchDate = assignment?.match_id?.date;
  const isFutureMatch = matchDate && new Date(matchDate) > new Date();

  const { weather, loading: weatherLoading, error: weatherError } =
    useWeather(!isFutureMatch ? city : null);

  const { forecast, loading: forecastLoading, error: forecastError } = useForecast(isFutureMatch ? city : null, matchDate);


  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const data = await getAssignmentById(id);
        setAssignment(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id, getAssignmentById])

  if (loading) {
    return <p className="mt-20 text-center text-lg">Cargando Designaciones...</p>;
  }

  if (!assignment) {
    return <p className="mt-20 text-center text-lg text-red-600">Designación no encontrada</p>;
  }

  return (
    <div className="mt-10 text-black p-4 max-w-xl mx-auto">
      {/* Botón de volver */}
      <div className="mb-6">
        <Link
          to="/dashboard/assignments"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Volver al listado
        </Link>
      </div>

      <div className="border p-4 rounded shadow bg-white">
        <h3 className="text-xl font-bold mb-4">Descripción de la designación</h3>

        <p><strong>Partido:</strong> {assignment.match_id.home_team} vs {assignment.match_id.away_team}</p>
        <p><strong>Cancha:</strong> {assignment.match_id.location}</p>
        <p><strong>Ciudad:</strong> {assignment.match_id.city}</p>
        <p><strong>Fecha:</strong> {new Date(assignment.match_id.date).toLocaleString()}</p>

        <hr className="my-3" />

        <p><strong>Árbitro:</strong> {assignment.referee_id.username}</p>
        <p><strong>Asistente 1:</strong> {assignment.assistant1_id.username}</p>
        <p><strong>Asistente 2:</strong> {assignment.assistant2_id.username}</p>

        <p><strong>Observaciones:</strong> {assignment.observations || "—"}</p>
      </div>

      {/* CLIMA DEL PARTIDO */}
      <div className="border p-4 rounded shadow bg-white mt-6">
        <h3 className="text-lg font-bold mb-2">
          {isFutureMatch ? "Pronóstico del tiempo para el partido" : "Clima actual"}
        </h3>

        {/* CLIMA ACTUAL */}
        {!isFutureMatch && weatherLoading && <p>Cargando clima...</p>}
        {!isFutureMatch && weatherError && <p className="text-red-500">{weatherError}</p>}

        {!isFutureMatch && weather && (
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icono clima"
            />
            <div>
              <p className="capitalize">{weather.weather[0].description}</p>
              <p>🌡️ {weather.main.temp} °C</p>
              <p>💧 Humedad: {weather.main.humidity}%</p>
              <p>💨 Viento: {weather.wind.speed} km/h</p>
            </div>
          </div>
        )}

        {/* PRONÓSTICO */}
        {isFutureMatch && forecastLoading && <p>Cargando pronóstico...</p>}
        {isFutureMatch && forecastError && <p className="text-red-500">{forecastError}</p>}

        {isFutureMatch && forecast && (
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt="icono pronóstico"
            />
            <div>
              <p className="capitalize">{forecast.weather[0].description}</p>
              <p>🌡️ {forecast.main.temp} °C</p>
              <p>💧 Humedad: {forecast.main.humidity}%</p>
              {/* <p>🕒 {new Date(forecast.dt_txt).toLocaleString()}</p> */}
              <p className="text-xs text-gray-500">
                Pronóstico estimado
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default AsignmentDetail