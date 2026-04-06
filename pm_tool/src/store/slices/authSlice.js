import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api"

/* ================================
   ASYNC THUNKS
================================ */

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", credentials)
      return res.data.user
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      )
    }
  }
)

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/me")
      return res.data
    } catch {
      return rejectWithValue("Session expired")
    }
  }
)

/* ================================
   AUTH SLICE
================================ */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    initialized: false, // 👈 ADD THIS
    error: null
  },
  reducers: {
    logout: (state) => {
      api.post("/auth/logout")
      state.user = null
      state.isAuthenticated = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.initialized = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.initialized = true
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.initialized = true
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.initialized = true
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
