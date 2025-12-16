import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login, user } = useAuth()

  if (user) return <Navigate to="/dashboard" replace />

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password)
    if (!success) {
      
      toast.error("Login fallido. Por favor chequee sus credenciales")
    } else {
      
      toast.success("Logueado correctamente");
    }
  }
  return (
    <>
      <div className='max-w-md mx-auto pt-20'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

          <input 
            {...register('email', { required: 'Email is required' })}
            type="email" 
            placeholder='Email'
            className='w-full p-2 border border-gray-300 rounded'
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}

          <input 
            {...register('password', { required: 'Password is required' })}
            type="password" 
            placeholder='password'
            className='w-full p-2 border border-gray-300 rounded'
          />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

          <button
            type='submit'
            className='bg-blue-600 text-white p-2 rounded'
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </>
  )
}

export default Login