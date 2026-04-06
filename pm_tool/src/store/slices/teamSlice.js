import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api"; // your axios instance with auth token

// 🔹 Thunks
export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async () => {
    const res = await axios.get("/teams");
    return res.data;
  }
);

export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (payload) => {
    const res = await axios.post("/teams", payload);
    return res.data;
  }
);

export const updateTeamUtilization = createAsyncThunk(
  "teams/updateUtilization",
  async ({ teamId, utilization }) => {
    const res = await axios.patch(`/teams/${teamId}/utilization`, {
      utilization
    });
    return res.data;
  }
);

// 🔹 Slice
const teamSlice = createSlice({
  name: "teams",
  initialState: {
    list: [],
    loading: false,
    selectedTeam: null
  },
  reducers: {
    openTeamDrawer(state, action) {
      state.selectedTeam = action.payload;
    },
    closeTeamDrawer(state) {
      state.selectedTeam = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTeams.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTeamUtilization.fulfilled, (state, action) => {
        const idx = state.list.findIndex(t => t._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
        state.selectedTeam = action.payload;
      });
  }
});

export const {
  openTeamDrawer,
  closeTeamDrawer
} = teamSlice.actions;

export default teamSlice.reducer;
