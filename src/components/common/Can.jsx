import { useAuth } from "../../context/AuthContext"

const Can = ({ permission, children }) => {
  const { user } = useAuth()

  if (!user?.permissions?.includes(permission)) {
    return null
  }

  return children
}

export default Can
