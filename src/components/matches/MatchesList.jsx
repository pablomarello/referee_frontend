import { useMatches } from '../../hooks/useMatches'
import { Link } from 'react-router-dom';
import MatchesCard from './MatchCard';

const MatchesList = () => {
  const { matches, loading, error } = useMatches()
  return (
    <>
  <div className='mt-10 text-black p-4 max-w-7xl mx-auto'>

    <h1 className='flex justify-center font-semibold text-4xl m-2 text-white'>
      Partidos
    </h1>

    <div className='grid grid-cols-1 gap-4 m-4 justify-items-center'>
      {matches.map((match) => (
        <MatchesCard key={match.id} match={match} />
      ))}
    </div>

  </div>
</>
  )
}

export default MatchesList