import { useMatches } from '../../hooks/useMatches'
import { Link } from 'react-router-dom';
import MatchesCard from './MatchCard';
import { ClipLoader } from 'react-spinners';

const MatchesList = () => {
  const { matches, loading, error } = useMatches()

  if (loading) {
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