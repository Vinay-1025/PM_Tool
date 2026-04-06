import React, { createContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import api from "../utils/api"

export const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  const [theme, setTheme] = useState("light")

  /* ----------------------------------
     Load theme from logged-in user
  ---------------------------------- */
  useEffect(() => {
    if (user?.theme) {
      setTheme(user.theme)
    }
  }, [user])

  /* ----------------------------------
     Apply theme to DOM
  ---------------------------------- */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  /* ----------------------------------
     Toggle & persist theme
  ---------------------------------- */
  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)

    try {
      await api.patch("/users/theme", { theme: newTheme })
    } catch (err) {
      console.error("Failed to update theme", err)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
