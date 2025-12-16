import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Navbar = () => {
  const { user } = useAuth()

  return (
    <header className="h-24 bg-slate-800 border-b flex items-center justify-between px-6">
      <Link
        to="/"
        className=" bg-green-700 hover:bg-green-800 transition-colors px-5 py-2 rounded-md text-white font-semibold text-center ml-6 "
      >
        Inicio
      </Link>

      
    </header>
  )
}

export default Navbar
