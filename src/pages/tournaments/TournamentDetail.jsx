import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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