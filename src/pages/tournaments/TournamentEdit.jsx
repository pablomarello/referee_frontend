import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTournaments } from '../../hooks/useTournaments'
import TournamentForm from './TournamentForm'

const TournamentEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const {  updateTournament, getTournamentById } = useTournaments()
  const [ tournamentData, setTournamentData] = useState(null)

  useEffect(() => {
    const fetchTournamentData = async () => {
      const data = await getTournamentById(id)
      setTournamentData(data)
    }
    fetchTournamentData()
  }, [id, getTournamentById])

  const handleEditTournament = async (data) => {
    try {
      await updateTournament(id, data)
      navigate('/dashboard/tournaments')
    } catch (error) {
      console.error('Error al editar torneo:', error)
    }
  }

  // ⛔ No renderizar el form hasta tener datos
  if (!tournamentData) {
    return <p className="p-6">Cargando partido...</p>
  }


  return (
    <TournamentForm
      onSubmit={handleEditTournament}
      onCancel={() => navigate('/dashboard/tournaments')}
      initialValues={tournamentData}
    />
  )
}

export default TournamentEdit