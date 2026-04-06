import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PublicRoute = ({ children }) => {
  const { isAuthenticated, initialized } = useSelector(
    (state) => state.auth
  )

  // ⏳ Wait until auth state is resolved
  if (!initialized) {
    return null // or loader
  }

  return !isAuthenticated
    ? children
    : <Navigate to="/dashboard" replace />
}

export default PublicRoute
