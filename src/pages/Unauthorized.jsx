import { Link } from "react-router-dom"

const Unauthorized = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      
      <h1 className="text-6xl font-bold text-red-500 mb-4">
        403
      </h1>

      <h2 className="text-2xl font-semibold mb-2 text-black">
        Acceso no autorizado
      </h2>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        No tenés permisos para acceder a esta sección.
        Si creés que es un error, contactá al administrador.
      </p>

      <div className="flex gap-4">
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
        >
          Ir al Dashboard
        </Link>

        <Link
          to="/"
          className="px-4 py-2 border border-slate-800 text-slate-800 rounded hover:bg-slate-100"
        >
          Volver al inicio
        </Link>
      </div>

    </div>
  )
}

export default Unauthorized