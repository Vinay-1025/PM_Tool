import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../utils/api"

export const fetchTeamUsers = createAsyncThunk(
  "users/fetchTeamUsers",
  async (roles) => {
    const res = await axios.get(
      `/users/team-users?roles=${roles.join(",")}`
    )
    return res.data
  }
)

const userSlice = createSlice({
  name: "users",
  initialState: {
    teamUsers: [],
    loading: false
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTeamUsers.pending, s => {
        s.loading = true
      })
      .addCase(fetchTeamUsers.fulfilled, (s, a) => {
        s.loading = false
        s.teamUsers = a.payload
      })
  }
})

export default userSlice.reducer
