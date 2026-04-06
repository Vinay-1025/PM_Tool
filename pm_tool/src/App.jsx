import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

import ThemeProvider from "./context/ThemeContext"
import LayoutProvider from "./context/LayoutContext"
import AuthProvider from "./context/AuthContext"

import ProtectedRoute from "./routes/ProtectedRoutes"
import PublicRoute from "./routes/PublicRoute"
import MainLayout from "./components/Layout/MainLayout"

import Login from "./pages/Login/Login"
import Dashboard from "./pages/Dashboard/Dashboard"
import Projects from "./pages/Projects/Projects"
import Tasks from "./pages/Tasks/Tasks"
import Teams from "./pages/Teams/Teams"
import Sprints from "./pages/Sprints/Sprints"
import Timesheets from "./pages/Timesheets/Timesheets"
import Documents from "./pages/Documents/Documents"
import Reports from "./pages/Reports/Reports"
import Releases from "./pages/Releases/Releases"

import { fetchMe } from "./store/slices/authSlice"

const App = () => {
  const dispatch = useDispatch()

  /* -------------------------------------------------
     Bootstrap authentication on app load
     ------------------------------------------------- */
  useEffect(() => {
    // Always try to restore session (cookie-based auth)
    dispatch(fetchMe())
  }, [dispatch])

  return (
    <ThemeProvider>
      <AuthProvider>
        <LayoutProvider>
          <BrowserRouter>
            <Routes>

              {/* ---------- PUBLIC ROUTES ---------- */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              {/* ---------- PROTECTED ROUTES ---------- */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="tasks" element={<Tasks />} />
                        <Route path="teams" element={<Teams />} />
                        <Route path="sprints" element={<Sprints />} />
                        <Route path="timesheets" element={<Timesheets />} />
                        <Route path="releases" element={<Releases />} />
                        <Route path="documents" element={<Documents />} />
                        <Route path="reports" element={<Reports />} />
                      </Routes>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

            </Routes>
          </BrowserRouter>
        </LayoutProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
