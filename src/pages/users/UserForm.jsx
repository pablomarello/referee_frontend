import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRoles } from "../../hooks/useRoles"

const UserForm = ({ onSubmit, defaultValues = null, onCancel }) => {
  const { roles } = useRoles()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => {
  if (!defaultValues) return

  reset({
    username: defaultValues.username ?? '',
    email: defaultValues.email ?? '',
    password: '',
    date_of_birth: defaultValues.date_of_birth
      ? new Date(defaultValues.date_of_birth).toISOString().slice(0, 10)
      : '',
    role:
      typeof defaultValues.role === 'object'
        ? defaultValues.role._id || defaultValues.role.id || ''
        : defaultValues.role ?? '',
    type_referee: defaultValues.type_referee ?? 'principal',
    active: defaultValues.active ?? true,
  })
}, [defaultValues, reset])


  const submit = handleSubmit(async (data) => {
  const payload = {
    username: data.username,
    email: data.email,
    role: data.role,
    type_referee: data.type_referee,
    active: !!data.active,
  }

  if (data.password?.trim()) {
    payload.password = data.password
  }

  if (data.date_of_birth) {
    payload.date_of_birth = new Date(data.date_of_birth)
  }

  await onSubmit(payload)
})




  return (
    <form onSubmit={submit} className="space-y-4 p-4 bg-white rounded shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Usuario</label>
        <input {...register('username', { required: 'El usuario es requerido', minLength: { value: 3, message: 'Mínimo 3 caracteres' }, maxLength: { value: 60, message: 'Máximo 60 caracteres' } })} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
        {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input {...register('email', { required: 'El email es requerido', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Formato de email inválido' } })} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input type="password" {...register('password', { required: 'La contraseña es requerida', minLength: { value: 8, message: 'Mínimo 8 caracteres' } })} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
        {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
        <input type="date" {...register('date_of_birth')} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rol</label>
        <select {...register('role', { required: 'El rol es requerido' })} className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        >
          <option value="">Seleccione un Rol</option>
          {roles.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
        </select>
        {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role.message}</p>}
      </div>
        
      

      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de árbitro</label>
        <select {...register('type_referee')} className="mt-1 block w-full rounded border-gray-300 shadow-sm">
          <option value="principal">principal</option>
          <option value="asistente">asistente</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="inline-flex items-center">
          <input type="checkbox" {...register('active')} className="form-checkbox" />
          <span className="ml-2">Activo</span>
        </label>
      </div>

      <div className="flex items-center gap-2">
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
        {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancelar</button>}
      </div>
    </form>
  )
}

export default UserForm