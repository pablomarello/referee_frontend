import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTournaments } from '../../hooks/useTournaments'
import TournamentForm from './TournamentForm'
import { ClipLoader } from 'react-spinners'

const TournamentEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const {  updateTournament, getTournamentById, loading } = useTournaments()
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

  
  if (!tournamentData) {
    return (
    <div className="flex items-center justify-center h-[60vh]">
      <ClipLoader
        size={55}
        color="#c5224b" // verde (tailwind green-500)
        loading={loading}
      />
    </div>
  )
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