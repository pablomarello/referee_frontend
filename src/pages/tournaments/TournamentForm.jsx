import { useEffect } from "react"
import { useForm } from "react-hook-form"

const TournamentForm = ({
  onSubmit,
  onCancel,
  defaultValues = {},
  initialValues,
}) => {
  // prioridad: initialValues (editar) > defaultValues > vacío
  const source = initialValues ?? defaultValues

  const formatDefaults = (dv = {}) => ({
    name: dv.name ?? '',
    year: dv.year ?? new Date().getFullYear(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: formatDefaults(),
  })

  // SOLO cuando cambia initialValues (editar)
  useEffect(() => {
    if (initialValues) {
      reset(formatDefaults(initialValues))
    }
  }, [initialValues, reset])

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit({
          ...data,
          year: Number(data.year),
        })
      })}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre del torneo
          </label>
          <input
            type="text"
            {...register('name', {
              required: 'El nombre es requerido',
              minLength: {
                value: 3,
                message: 'Debe tener al menos 3 caracteres',
              },
            })}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Año */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Año
          </label>
          <input
            type="number"
            {...register('year', {
              required: 'El año es requerido',
              valueAsNumber: true,
              min: {
                value: 1900,
                message: 'Año inválido',
              },
              max: {
                value: new Date().getFullYear() + 1,
                message: 'Año demasiado alto',
              },
            })}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
          {errors.year && (
            <p className="text-xs text-red-600 mt-1">
              {errors.year.message}
            </p>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Guardar
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default TournamentForm
