import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { login, user } = useAuth()
  
  // Si usas el isSubmitting de useForm, se bloquea solo mientras la promesa dura.
  // O puedes usar un estado local si tu función login no es asíncrona de la forma que espera hook-form.

  if (user) return <Navigate to="/dashboard" replace />

  const onSubmit = async (data) => {
    try {
      const success = await login(data.email, data.password)
      if (!success) {
        toast.error("Credenciales incorrectas. Intenta de nuevo.")
      } else {
        toast.success(`Bienvenido de nuevo!`)
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor")
    }
  }

  return (
    // El contenedor padre usa h-full y justify-center para centrar la tarjeta en la pantalla
    <div className='flex flex-col justify-center items-center flex-grow p-4'>
      
      <div className='bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden'>
        
        {/* Encabezado de la tarjeta */}
        <div className='bg-gray-50 p-8 pb-4 text-center border-b border-gray-100'>
            <h2 className='text-3xl font-extrabold text-gray-800'>Bienvenido</h2>
            <p className='text-gray-500 mt-2'>Ingresa a tu cuenta para continuar</p>
        </div>

        {/* Formulario */}
        <div className='p-8 pt-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            
            {/* Input Email */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Correo Electrónico</label>
              <input 
                {...register('email', { 
                  required: 'El email es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido"
                  }
                })}
                type="email" 
                placeholder='ejemplo@correo.com'
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} focus:border-blue-500 focus:ring-4 outline-none transition-all`}
              />
              {errors.email && <p className='text-red-500 text-xs mt-1 font-medium'>{errors.email.message}</p>}
            </div>

            {/* Input Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className='block text-sm font-medium text-gray-700'>Contraseña</label>
                {/* Enlace decorativo opcional */}
                {/* <Link to="#" className="text-xs text-blue-600 hover:underline">¿Olvidaste tu contraseña?</Link> */}
              </div>
              <input 
                {...register('password', { required: 'La contraseña es requerida' })}
                type="password" 
                placeholder='••••••••'
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} focus:border-blue-500 focus:ring-4 outline-none transition-all`}
              />
              {errors.password && <p className='text-red-500 text-xs mt-1 font-medium'>{errors.password.message}</p>}
            </div>

            {/* Botón Submit */}
            <button
              type='submit'
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-black font-bold text-lg shadow-md transition-all
                ${isSubmitting 
                  ? 'bg-white cursor-not-allowed' 
                  : 'bg-fuchsia-400 hover:bg-fuchsia-500 hover:shadow-lg active:scale-[0.98]'
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                   Ingresando...
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>

          </form>
        </div>
        
        {/* Footer de la tarjeta (Opcional) */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
            {/* <p className="text-sm text-gray-600">
                ¿No tienes cuenta? <Link to="/register" className="text-blue-600 font-bold hover:underline">Regístrate</Link>
            </p> */}
        </div>

      </div>
    </div>
  )
}

export default Login