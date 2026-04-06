import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { LayoutContext } from "../../context/LayoutContext"
import { logout } from "../../store/slices/authSlice"
import {
  FiMenu,
  FiHome,
  FiFolder,
  FiCheckSquare,
  FiUsers,
  FiTrendingUp,
  FiClock,
  FiFileText,
  FiBarChart2,
  FiLogOut,
  FiUser,
} from "react-icons/fi"
import { FaArrowAltCircleLeft, FaFireAlt } from "react-icons/fa"
import "./Sidebar.css"

const mainMenu = [
  { path: "/dashboard", label: "Dashboard", icon: FiHome },
  { path: "/projects", label: "Projects", icon: FiFolder },
  { path: "/tasks", label: "Tasks", icon: FiCheckSquare },
  { path: "/teams", label: "Teams", icon: FiUsers },
  { path: "/sprints", label: "Sprints", icon: FiTrendingUp },
  { path: "/timesheets", label: "Timesheets", icon: FiClock },
  { path: "/releases", label: "Releases", icon: FaFireAlt },
  { path: "/documents", label: "Documents", icon: FiFileText },
  { path: "/reports", label: "Reports", icon: FiBarChart2 },
]

const Sidebar = () => {
  const { collapsed, setCollapsed } = useContext(LayoutContext)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* HEADER */}
      <div className="sidebar-header">
        {/* Logo */}
        <div className="brand">
          <div className="brand-logo">🚀</div>

          {/* Show text ONLY when expanded */}
          {!collapsed && (
            <div className="brand-text">
              <span className="brand-title">ProjectHub</span>
              <span className="brand-subtitle">Project Management</span>
            </div>
          )}
        </div>

        {/* Toggle button ONLY when expanded OR mobile */}
        {(!collapsed || window.innerWidth <= 768) && (
          <button onClick={() => setCollapsed(!collapsed)}>
            <FaArrowAltCircleLeft />
          </button>
        )}
      </div>

      {/* MENU */}
      <nav className="menu-wrapper">
        {mainMenu.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
              onClick={() =>
                window.innerWidth <= 768 && setCollapsed(true)
              }
            >
              <Icon className="icon" />
              {!collapsed && <span className="text">{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer user-footer">
        <div className="user-info">
          <div className="avatar">
            <FiUser />
          </div>
          {!collapsed && (
            <div className="user-text">
              <span className="user-name">
                {user?.name || "User"}
              </span>
              <span className="user-role">
                {user?.role
                  ? user.role.replace("_", " ").toUpperCase()
                  : "MEMBER"}
              </span>
            </div>
          )}
        </div>

        <button
          className="menu-item logout-item"
          onClick={() => dispatch(logout())}
        >
          <FiLogOut className="icon" />
          {!collapsed && <span className="text">Logout</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
