import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Agregué Link para el botón volver
import { useMatches } from "../../../hooks/useMatches";

const MatchDetail = () => {
  const { id } = useParams();
  const { getMatchById } = useMatches();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const data = await getMatchById(id);
        setMatch(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id, getMatchById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="mt-10 text-center">
        <p className="text-xl text-red-600 font-semibold mb-4">Partido no encontrado</p>
        <Link to="/dashboard/matches" className="text-blue-500 hover:underline">
          &larr; Volver a la lista
        </Link>
      </div>
    );
  }

  // Helpers para visualización
  const homeName = match.home_team?.name ?? match.home_team;
  const awayName = match.away_team?.name ?? match.away_team;
  const tournamentName = match.tournament?.name ?? match.tournament;
  const matchDate = match.date ? new Date(match.date).toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Fecha por definir';
  const matchTime = match.date ? new Date(match.date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4 pb-10">
      {/* Botón de volver */}
      <div className="mb-6">
        <Link 
          to="/dashboard/matches" 
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Volver al listado
        </Link>
      </div>

      {/* TARJETA PRINCIPAL */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        
        {/* ENCABEZADO: Torneo y Estado */}
        <div className="bg-gray-50 px-6 py-4 border-b flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="font-bold text-gray-500 uppercase tracking-wider text-sm">
            {tournamentName}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            match.status === 'Finalizado' ? 'bg-green-100 text-green-700' : 
            match.status === 'En vivo' ? 'bg-red-100 text-red-700 animate-pulse' : 
            'bg-blue-100 text-blue-700'
          }`}>
            {match.status}
          </span>
        </div>

        {/* CUERPO: Enfrentamiento y Marcador */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Equipo Local */}
            <div className="flex-1 text-center order-1 md:order-1">
              <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-3 text-2xl font-bold text-gray-400">
                {/* Placeholder para logo si no tienes imágenes */}
                {homeName.charAt(0)}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">{homeName}</h2>
              <p className="text-gray-500 text-sm mt-1">Local</p>
            </div>

            {/* Marcador Central */}
            <div className="flex flex-col items-center justify-center order-2 md:order-2 bg-gray-50 px-8 py-4 rounded-xl">
              <div className="text-5xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                <span>{match.score_home ?? '-'}</span>
                <span className="text-gray-300 text-3xl">:</span>
                <span>{match.score_away ?? '-'}</span>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-500 text-center">
                <p>{matchDate}</p>
                <p>{matchTime}</p>
              </div>
            </div>

            {/* Equipo Visitante */}
            <div className="flex-1 text-center order-3 md:order-3">
              <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-3 text-2xl font-bold text-gray-400">
                 {/* Placeholder para logo */}
                 {awayName.charAt(0)}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">{awayName}</h2>
              <p className="text-gray-500 text-sm mt-1">Visitante</p>
            </div>

          </div>
        </div>

        {/* PIE DE PÁGINA: Detalles técnicos */}
        <div className="bg-gray-50 border-t px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span className="font-semibold mr-2">Lugar:</span> 
              {match.location}
            </div>

            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              <span className="font-semibold mr-2">ID Partido:</span> 
              <span className="font-mono bg-gray-200 px-1 rounded text-xs">{match._id}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span className="font-semibold mr-2">Creado:</span> 
              {new Date(match.createdAt).toLocaleDateString()}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default MatchDetail;