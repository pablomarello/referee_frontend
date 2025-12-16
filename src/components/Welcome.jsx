import { useUsers } from "../hooks/useUsers"


const Welcome = () => {
  const { users } = useUsers() 
  
  return (
    
    <div className='bg-gray-100 flex flex-col sm:flex-row sm:items-center 4xl:justify-between p-8'>
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart mr-3 text-primary-500"><line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line></svg>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600">Bienvenido de nuevo!</p>
      </div>
      
      
    </div>

  )
}

export default Welcome