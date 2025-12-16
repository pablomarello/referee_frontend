import MatchForm from '../../components/dashboard/matches/MatchForm'
import { useNavigate } from 'react-router-dom'
import { useMatches } from '../../hooks/useMatches'

const MatchCreate = () => {
  const navigate = useNavigate()
  const { createMatch } = useMatches()

  const handleCreateMatch = async (data) => {
    try {
      await createMatch({
        ...data,
        date: new Date(data.date),
      })

      navigate('/dashboard/matches')
    } catch (error) {
      console.error('Error al crear partido:', error)
    }
  }

  return (
    <MatchForm
      onSubmit={handleCreateMatch}
      onCancel={() => navigate('/dashboard/matches')}
    />
  )
}

export default MatchCreate
