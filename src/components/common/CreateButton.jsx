import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const CreateButton = ({ to, label, permission }) => {
  const { user } = useAuth()

  if (!user || !user.permissions?.includes(permission)) {
    return null
  }

  return (
    <Link
      to={to}
      className="mt-4 sm:mt-0 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md active:scale-95 transition-transform"
    >
      {label}
    </Link>
  )
}

export default CreateButton

