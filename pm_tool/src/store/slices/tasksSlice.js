import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

/* ===========================
   ASYNC THUNKS
=========================== */

/* Fetch all tasks */
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async () => {
    const res = await api.get("/tasks");
    return res.data;
  }
);

/* Update task status (Kanban drag & drop) */
export const updateTaskStatus = createAsyncThunk(
  "tasks/status",
  async ({ taskId, status }) => {
    const res = await api.patch(`/tasks/${taskId}/status`, { status });
    return res.data;
  }
);

/* Create new task */
export const createTask = createAsyncThunk(
  "tasks/create",
  async (data) => {
    const res = await api.post("/tasks", data);
    return res.data;
  }
);

export const updateTaskDueDate = createAsyncThunk(
  "tasks/updateDueDate",
  async ({ taskId, dueDate, comment }) => {
    const res = await api.patch(`/tasks/${taskId}/due-date`, {
      dueDate,
      comment
    });
    return res.data;
  }
);


/* ===========================
   SLICE
=========================== */

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* FETCH TASKS */
      .addCase(fetchTasks.fulfilled, (_, action) => {
        return action.payload;
      })

      /* UPDATE STATUS */
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const index = state.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      })

      /* UPDATE DUE DATE (Calendar) */
      .addCase(updateTaskDueDate.fulfilled, (state, action) => {
        const index = state.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      })

      /* CREATE TASK */
      .addCase(createTask.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default tasksSlice.reducer;
