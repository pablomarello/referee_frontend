import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useTournaments } from '../../hooks/useTournaments';

const TournamentDetail = () => {
  const { id } = useParams();
  const { getTournamentById } = useTournaments();

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
            const data = await getTournamentById(id);
            setTournament(data);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
        fetchTournament();
    }, [id, getTournamentById])

    if (loading) {
    return <p className="mt-20 text-center text-lg">Cargando Torneos...</p>;
  }

  if (!tournament) {
    return <p className="mt-20 text-center text-lg text-red-600">Torneo no encontrado</p>;
  }

  return (
    <div className="mt-10 text-black p-4 max-w-xl mx-auto">
      {/* Botón de volver */}
      <div className="mb-6">
        <Link 
          to="/dashboard/tournaments" 
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Volver al listado
        </Link>
      </div>
      <div className="border p-4 rounded shadow bg-white">
        <h3 className="text-xl font-bold mb-4">Descripción del Torneo</h3>
        <h4>ID: {tournament._id}</h4>
        <h4>NOMBRE: {tournament.name}</h4>
        <h4>AÑO{tournament.year}</h4>
        <h4>FECHA DE CREACIÓN: {tournament.createdAt}</h4>
      </div>
    </div>
  )
}

export default TournamentDetail