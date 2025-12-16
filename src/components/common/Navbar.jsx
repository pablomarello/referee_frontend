import { useAuth } from "../../context/AuthContext"

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <span className="font-semibold">Gestor Fútbol</span>

      <div className="flex items-center gap-4">
        <span className="text-sm">{user?.role}</span>
        <button
          onClick={logout}
          className="text-red-500 text-sm"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}

export default Navbar
