import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useTournaments } from "../../../hooks/useTournaments"

const categories = ['primera', 'femenino', '3era', '5ta', '6ta', 'infantiles_A', 'infantiles_B']
const statuses = ['programado', 'en progreso', 'finalizado', 'suspendido']

const MatchForm = ({ onSubmit, defaultValues = {}, initialValues, onCancel }) => {
  const { tournaments } = useTournaments();
  const source = initialValues ?? defaultValues
  

  const formatDefaults = (dv = {}) => ({
    date: dv.date ? new Date(dv.date).toISOString().slice(0, 16) : '',
    home_team: dv.home_team ?? '',
    away_team: dv.away_team ?? '',
    location: dv.location ?? '',
    category: dv.category ?? '',
    tournament: dv.tournament?.name ?? dv.tournament ?? '',
    score_home: dv.score_home ?? 0,
    score_away: dv.score_away ?? 0,
    status: dv.status ?? 'programado',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: formatDefaults()
  })



  useEffect(() => {
    if (initialValues) {
      reset(formatDefaults(initialValues))
    }
  }, [initialValues, reset])

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data)
      })}
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha y hora</label>
          <input type="datetime-local" {...register('date', { required: 'La fecha es requerida' })} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
          {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ubicación</label>
          <input type="text" {...register('location', { required: 'La ubicación es requerida' })} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
          {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Equipo local</label>
          <input type="text" {...register('home_team', { required: 'El equipo local es requerido' })} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
          {errors.home_team && <p className="text-xs text-red-600 mt-1">{errors.home_team.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Equipo visitante</label>
          <input type="text" {...register('away_team', { required: 'El equipo visitante es requerido' })} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
          {errors.away_team && <p className="text-xs text-red-600 mt-1">{errors.away_team.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select {...register('category', { required: 'La categoría es requerida', validate: v => categories.includes(v) || 'Categoría inválida' })} className="mt-1 block w-full rounded border-gray-300 shadow-sm">
            <option value="">Seleccionar</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Torneo (nombre)</label>
          <select
            {...register("tournament", {
              required: "El torneo es requerido",
            })}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          >
            <option value="">Seleccione un torneo</option>
            {tournaments.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>

          {errors.tournament && <p className="text-xs text-red-600 mt-1">{errors.tournament.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select {...register('status', { validate: v => statuses.includes(v) || 'Estado inválido' })} className="mt-1 block w-full rounded border-gray-300 shadow-sm">
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.status && <p className="text-xs text-red-600 mt-1">{errors.status.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Goles local</label>
          <input type="number" min="0" {...register('score_home', { valueAsNumber: true, min: { value: 0, message: 'Valor mínimo 0' } })} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
          {errors.score_home && <p className="text-xs text-red-600 mt-1">{errors.score_home.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Goles visitante</label>
          <input type="number" min="0" {...register('score_away', { valueAsNumber: true, min: { value: 0, message: 'Valor mínimo 0' } })} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
          {errors.score_away && <p className="text-xs text-red-600 mt-1">{errors.score_away.message}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancelar</button>
      </div>
    </form>
  )
}

export default MatchForm