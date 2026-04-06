import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const res = await api.get("/projects");
    return res.data;
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (payload) => {
    const res = await api.post("/projects", payload);
    return res.data;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    list: [],
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProjects.pending, s => {
        s.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(createProject.fulfilled, (s, a) => {
        s.list.unshift(a.payload);
      });
  }
});

export default projectSlice.reducer;
