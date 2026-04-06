import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, initialized } = useSelector(
    (s) => s.auth
  )

  // ⏳ Wait until auth check finishes
  if (!initialized) {
    return null // or loading spinner
  }

  return isAuthenticated
    ? children
    : <Navigate to="/login" replace />
}

export default ProtectedRoute
