import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const links = [
  { to: "/dashboard/matches", label: "Partidos", perm: "read:partidos" },
  { to: "/dashboard/assignments", label: "Designaciones", perm: "read:designaciones" },
  { to: "/dashboard/tournaments", label: "Torneos", perm: "read:torneos" },
  { to: "/dashboard/users", label: "Usuarios", perm: "read:usuarios" },
]

const Sidebar = () => {
  const { user } = useAuth()
  return (
    <aside className="w-64 bg-slate-800 text-white p-4">
      <Link
        to="/dashboard"
        
      >
        <h2 className="font-bold mb-6">Dashboard</h2>
      </Link>

      <nav className="space-y-2">
        {links
          .filter(link => user?.permissions?.includes(link.perm))
          .map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${
                  isActive ? "bg-slate-600" : "hover:bg-slate-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  )
}

export default Sidebar
