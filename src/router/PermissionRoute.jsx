import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const PermissionRoute = ({ permission, children }) => {
  const { user } = useAuth()

  if (!user?.permissions?.includes(permission)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default PermissionRoute
