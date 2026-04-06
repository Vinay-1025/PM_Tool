import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi"
import { loginUser } from "../../store/slices/authSlice"
import "./Login.css"

const Login = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <div className="login-brand">
            <h2>Welcome to AZ_PM</h2>
            <p>Advanced Project & Workforce Management</p>
          </div>

          <img
            src="https://illustrations.popsy.co/gray/work-from-home.svg"
            alt="Work illustration"
            className="login-illustration"
          />
        </div>

        <div className="login-right">
          <div className="login-form-header">
            <h3>Sign In</h3>
            <p>Access your workspace</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {error && (
              <p style={{ color: "#ef4444", fontSize: "13px", marginBottom: "10px" }}>
                {error}
              </p>
            )}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <span className="login-footer">
            © {new Date().getFullYear()} AZ_PM Platform
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
