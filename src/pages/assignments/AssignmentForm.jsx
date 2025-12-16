import { useEffect, useRef  } from "react"
import { useForm } from "react-hook-form"
import { useUsers } from "../../hooks/useUsers"
import { useMatches } from "../../hooks/useMatches";

const AssignmentForm = ({
  onSubmit,
  onCancel,
  defaultValues = {},
  initialValues,
}) => {
  const { users } = useUsers();
  const { matches } = useMatches();
  const source = initialValues ?? defaultValues
  const ARBITRO_ROLE_ID = "69399d6132ae32e5cf1dbe4d"

  const formatDefaults = (dv = {}) => ({
  match_id: dv.match_id?._id || dv.match_id || "",
  referee_id: dv.referee_id?._id || dv.referee_id || "",
  assistant1_id: dv.assistant1_id?._id || dv.assistant1_id || "",
  assistant2_id: dv.assistant2_id?._id || dv.assistant2_id || "",
  observations: dv.observations ?? "",
})



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: formatDefaults(),
  })

  const hasReset = useRef(false)

useEffect(() => {
  if (
    initialValues &&
    matches.length > 0 &&
    users.length > 0 &&
    !hasReset.current
  ) {
    reset(formatDefaults(initialValues))
    hasReset.current = true
  }
}, [initialValues, matches, users, reset])


  const arbitros = users?.filter(
    (user) => user.role?._id === ARBITRO_ROLE_ID
  )


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Partido */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Partido
        </label>
        <select
          {...register("match_id", { required: "El partido es requerido" })}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        >
          <option value="">Seleccionar partido</option>
          {matches.map((match) => (
            <option key={match._id} value={match._id}>
              {match.home_team} vs {match.away_team}
            </option>
          ))}
        </select>

        {errors.match_id && (
          <p className="text-xs text-red-600 mt-1">
            {errors.match_id.message}
          </p>
        )}
      </div>

      {/* Arbitro principal */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Árbitro principal
        </label>

        <select
          {...register("referee_id", { required: "El árbitro es requerido" })}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        >
          <option value="">Seleccionar árbitro</option>

          {arbitros?.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>


        {errors.referee_id && (
          <p className="text-xs text-red-600 mt-1">
            {errors.referee_id.message}
          </p>
        )}
      </div>

      {/* Asistentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Asistente 1
          </label>

          <select
            {...register("assistant1_id", {
              required: "El asistente 1 es requerido",
            })}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          >
            <option value="">Seleccionar asistente</option>

            {arbitros?.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
          </select>

          {errors.assistant1_id && (
            <p className="text-xs text-red-600 mt-1">
              {errors.assistant1_id.message}
            </p>
          )}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">
            Asistente 2
          </label>

          <select
            {...register("assistant2_id", {
              required: "El asistente 2 es requerido",
            })}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          >
            <option value="">Seleccionar asistente</option>

            {arbitros?.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
          </select>

          {errors.assistant2_id && (
            <p className="text-xs text-red-600 mt-1">
              {errors.assistant2_id.message}
            </p>
          )}
        </div>

      </div>

      {/* Observaciones */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Observaciones
        </label>
        <textarea
          rows="3"
          {...register("observations")}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      {/* Botones */}
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

export default AssignmentForm

