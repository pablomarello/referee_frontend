import { Link } from 'react-router-dom';

const MatchCard = ({ match }) => {
  // Helpers para datos seguros
  const homeName = match.home_team?.name ?? match.home_team ?? 'Local';
  const awayName = match.away_team?.name ?? match.away_team ?? 'Visitante';
  const tournamentName = match.tournament?.name ?? match.tournament ?? 'Torneo';
  const location = match.location ?? 'Ubicación no definida';

  // Formateo de fecha y hora
  const dateObj = match.date ? new Date(match.date) : null;
  const dateStr = dateObj 
    ? dateObj.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) 
    : 'Fecha por definir';
  const timeStr = dateObj 
    ? dateObj.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: true }) 
    : '';

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full max-w-3xl mx-auto my-4">
      
      {/* 1. ENCABEZADO: Torneo y Estado (Estilo barra superior) */}
      <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200 bg-white">
        {/* Nombre del Torneo a la izquierda (donde estaba el ID largo) */}
        <span className="text-gray-500 font-bold uppercase tracking-wider text-sm">
          {tournamentName}
        </span>

        {/* Badge de Estado a la derecha */}
        <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase ${
             match.status === 'Finalizado' ? 'bg-blue-100 text-blue-600' : 
             match.status === 'En vivo' ? 'bg-red-100 text-red-600' : 
             'bg-gray-100 text-gray-600'
        }`}>
          {match.status}
        </span>
      </div>

      {/* 2. CUERPO PRINCIPAL: Equipos y Marcador */}
      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Equipo LOCAL */}
        <div className="flex flex-col items-center flex-1 w-full">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold text-xl mb-3">
             {/* Inicial del equipo (o <img /> si tienes logo) */}
             {homeName.charAt(0)}
          </div>
          <h3 className="text-lg font-bold text-gray-800 text-center leading-tight">{homeName}</h3>
          <span className="text-xs text-gray-400 font-medium mt-1 uppercase">Local</span>
        </div>

        {/* CENTRO: Marcador y Fecha (El recuadro gris de la imagen) */}
        <div className="bg-gray-50 rounded-xl px-8 py-4 flex flex-col items-center justify-center min-w-[200px]">
          {/* Puntuación */}
          <div className="text-4xl font-black text-gray-900 mb-2 tracking-widest">
            {match.score_home ?? 0} <span className="text-gray-300">:</span> {match.score_away ?? 0}
          </div>
          
          {/* Fecha y Hora */}
          <div className="text-center">
            <p className="text-xs text-gray-500 font-medium capitalize">{dateStr}</p>
            <p className="text-xs text-gray-400 mt-1">{timeStr}</p>
          </div>
        </div>

        {/* Equipo VISITANTE */}
        <div className="flex flex-col items-center flex-1 w-full">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold text-xl mb-3">
             {awayName.charAt(0)}
          </div>
          <h3 className="text-lg font-bold text-gray-800 text-center leading-tight">{awayName}</h3>
          <span className="text-xs text-gray-400 font-medium mt-1 uppercase">Visitante</span>
        </div>

      </div>

      {/* 3. PIE DE TARJETA: Solo Ubicación (Como pediste) */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 flex items-center text-gray-500 text-sm">
        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <span className="font-medium mr-1">Lugar:</span> 
        {location}
        
        {/* Botón Ver detalles opcional a la derecha del footer */}
        {/* <Link to={`/dashboard/matches/${match._id ?? match.id}`} className="ml-auto text-blue-500 hover:text-blue-700 font-semibold text-xs uppercase tracking-wide">
            Ver detalles &rarr;
        </Link> */}
      </div>

    </div>
  )
}

export default MatchCard