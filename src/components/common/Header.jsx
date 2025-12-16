import { Link } from "react-router-dom"
import logo from '/images/logogestion.png'
import { useAuth } from "../../context/AuthContext"

const Header = () => {
  const { user, logout } = useAuth()
  return (
   <header 
      className='bg-green-950 text-white text-xl fixed top-0 left-0 w-full h-16 flex items-center font-oswald z-50 px-4'>
        <div className='relative flex justify-between w-full max-w-7xl mx-auto'>
          <nav className='flex justify-between w-full items-center'>
            <Link className='font-bold text-2xl' to="/">
            <img 
                src={logo} 
                alt="logo" 
                className=" h-18 w-auto"
              />
            </Link>
            
            <ul className='flex gap-6'>
             
             {user ? (
              <>
                <Link className='bg-slate-700 rounded p-2' to="/dashboard">
                  Dashboard
                </Link>
                {/* <span className="text-sm">Hola, {user.username}</span> */}
                <button
                  onClick={logout}
                  className="bg-red-500 rounded p-2"
                >
                  Cerrar sesión
                </button>
              </>
             ) : (
              <>
                <Link
                className="bg-fuchsia-300 hover:bg-fuchsia-400 transition-colors px-4 py-2 rounded-md text-black font-semibold" 
                to="/login"><li>Iniciar Sesión</li>
              </Link>
              </>
             )
            }
            </ul>
          </nav>
        </div>
    </header>
  )
}

export default Header