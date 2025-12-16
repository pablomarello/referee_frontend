import TournamentForm from "./TournamentForm"
import { useTournaments } from "../../hooks/useTournaments"
import { useNavigate } from 'react-router-dom'

const TournamentCreate = () => {
  const navigate = useNavigate()
  const { createTournament } = useTournaments()

  const handleCreateTournament = async (data) => {
    try {
      await createTournament({
        ...data,
        date: new Date(data.date),
      })

      navigate('/dashboard/tournaments')
    } catch (error) {}
    console.error('Error al crear el torneo:', error)
  }

  return (
    <TournamentForm
      onSubmit={handleCreateTournament}
      onCancel={() => navigate('/dashboard/tournaments')}
    />
  )
}

export default TournamentCreate