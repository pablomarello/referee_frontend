import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      
      <h1 className="text-6xl font-bold text-red-500 mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold mb-2 text-black">
        Página no encontrada
      </h2>

      

      <div className="flex gap-4">
        
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

export default NotFound