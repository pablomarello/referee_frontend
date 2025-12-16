import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMatches } from '../../hooks/useMatches'
import MatchForm from '../../components/dashboard/matches/MatchForm'

const MatchEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { updateMatch, getMatchById } = useMatches()
  const [matchData, setMatchData] = useState(null)

  useEffect(() => {
    const fetchMatchData = async () => {
      const data = await getMatchById(id)
      setMatchData(data)
    }
    fetchMatchData()
  }, [id, getMatchById])

  const handleEditMatch = async (data) => {
    try {
      await updateMatch(id, data) // ✅ ID + DATA
      navigate('/dashboard/matches')
    } catch (error) {
      console.error('Error al editar partido:', error)
    }
  }

  // ⛔ No renderizar el form hasta tener datos
  if (!matchData) {
    return <p className="p-6">Cargando partido...</p>
  }

  return (
    <MatchForm
      onSubmit={handleEditMatch}
      onCancel={() => navigate('/dashboard/matches')}
      initialValues={matchData}
    />
  )
}

export default MatchEdit
