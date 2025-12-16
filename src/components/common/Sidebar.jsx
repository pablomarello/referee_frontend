import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import logo from '/images/logogestion.png'

const links = [
  { to: "/dashboard/matches", label: "Partidos", perm: "read:partidos" },
  { to: "/dashboard/assignments", label: "Designaciones", perm: "read:designaciones" },
  { to: "/dashboard/tournaments", label: "Torneos", perm: "read:torneos" },
  { to: "/dashboard/users", label: "Usuarios", perm: "read:usuarios" },
]

const Sidebar = () => {
  const { user, logout } = useAuth()

  return (
    <aside className="w-auto h-full bg-slate-800 text-white p-4 flex flex-col">
      <div class="flex items-center justify-between border-b border-gray-200">
        <img
        src={logo}
        alt="logo"
        className=" h-20 w-20"
      />
        <Link to="/dashboard">
      
        <h2 className="font-bold">Admin</h2>
      </Link>
      </div>
      

      {/* navegación */}
      <nav className="space-y-2">
        {links
          .filter(link => user?.permissions?.includes(link.perm))
          .map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${isActive ? "bg-slate-600" : "hover:bg-slate-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
      </nav>

      
      <button
          onClick={logout}
          className="mt-auto bg-slate-600 hover:bg-slate-700 transition-colors px-4 py-2 rounded-md text-white font-semibold text-center"
        >
          Cerrar sesión
        </button>
    </aside>
  )
}


export default Sidebar
