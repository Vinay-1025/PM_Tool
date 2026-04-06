import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LayoutContext } from "../../context/LayoutContext"
import { ThemeContext } from "../../context/ThemeContext"
import { logout } from "../../store/slices/authSlice"
import {
  FiSun,
  FiMoon,
  FiBell,
  FiUser,
  FiLogOut,
  FiMenu,
} from "react-icons/fi"
import { FaGithub } from "react-icons/fa"
import "./Header.css"

const Header = () => {
  const { collapsed, setCollapsed } = useContext(LayoutContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  // 🔗 GitHub connect handler
  const connectGithub = () => {
    window.location.href =
      "http://localhost:5000/api/v1/integrations/github/connect"
  }

  return (
    <header className={`header ${collapsed ? "collapsed" : ""}`}>
      {/* LEFT */}
      <div className="header-left">
        <button
          className="icon-btn menu-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FiMenu />
        </button>

        <div className="header-title">
          Advanced Project & Workforce Management
        </div>
      </div>

      {/* RIGHT */}
      <div className="header-actions">
        <button className="icon-btn">
          <FiBell />
        </button>

        {/* 🔥 GitHub Integration Button */}
        <button
          className="icon-btn"
          onClick={connectGithub}
          title={
            user?.github?.githubUserId
              ? "GitHub Connected"
              : "Connect GitHub"
          }
        >
          <FaGithub />
        </button>

        <button className="icon-btn" onClick={toggleTheme}>
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>

        {/* PROFILE */}
        <div className="profile">
          <div className="avatar">
            <FiUser />
          </div>

          <span className="username">
            {user?.name || "User"}
          </span>

          <button
            className="logout-btn"
            onClick={() => dispatch(logout())}
            title="Logout"
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
