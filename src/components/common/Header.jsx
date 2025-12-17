import { Link } from "react-router-dom"
import logo from '/images/logogestion.png'
import { useAuth } from "../../context/AuthContext"

const Header = () => {
  const { user, logout } = useAuth()
  return (
   <header
  className="fixed top-0 left-0 w-full h-16 z-50 text-white font-oswald"
>
  {/* Contenedor relativo */}
  <div className="relative h-full w-full bg-[#0f0f0f] overflow-hidden">

    {/* Fondo Circuit Board */}
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 19px,
            rgba(34, 197, 94, 0.15) 19px,
            rgba(34, 197, 94, 0.15) 20px,
            transparent 20px,
            transparent 39px,
            rgba(34, 197, 94, 0.15) 39px,
            rgba(34, 197, 94, 0.15) 40px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 19px,
            rgba(34, 197, 94, 0.15) 19px,
            rgba(34, 197, 94, 0.15) 20px,
            transparent 20px,
            transparent 39px,
            rgba(34, 197, 94, 0.15) 39px,
            rgba(34, 197, 94, 0.15) 40px
          ),
          radial-gradient(circle at 20px 20px, rgba(16, 185, 129, 0.18) 2px, transparent 2px),
          radial-gradient(circle at 40px 40px, rgba(16, 185, 129, 0.18) 2px, transparent 2px)
        `,
        backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
      }}
    />

    {/* Contenido del header */}
    <div className="relative z-10 h-full flex items-center px-4">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto">

        {/* Logo */}
        <Link className="font-bold text-2xl" to="/">
          <img
            src={logo}
            alt="logo"
            className="h-20 w-auto"
          />
        </Link>

        {/* Navegación */}
        <ul className="flex gap-6 items-center">
          {user ? (
            <>
              <Link
                className="bg-slate-700 hover:bg-slate-600 transition-colors px-3 py-2 rounded"
                to="/dashboard"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 transition-colors px-3 py-2 rounded"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              className="bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-2 rounded-md font-semibold"
              to="/login"
            >
              Iniciar sesión
            </Link>
          )}
        </ul>

      </nav>
    </div>
  </div>
</header>

  )
}

export default Header