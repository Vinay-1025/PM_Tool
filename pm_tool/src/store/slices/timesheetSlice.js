import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"
import api from "../../utils/api"

/* ================================
   ASYNC THUNKS
================================ */

// ➕ Add / Update timesheet
export const saveTimesheet = createAsyncThunk(
  "timesheets/save",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/timesheets", payload)
      return res.data
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save timesheet"
      )
    }
  }
)

// 📤 Submit timesheet
export const submitTimesheet = createAsyncThunk(
  "timesheets/submit",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`/timesheets/${id}/submit`)
      return id
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Submit failed"
      )
    }
  }
)

// 📄 My timesheets
export const fetchMyTimesheets = createAsyncThunk(
  "timesheets/my",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.get("/timesheets/my", { params })
      return res.data
    } catch {
      return rejectWithValue("Failed to load timesheets")
    }
  }
)

// 📊 Monthly summary
export const fetchMonthlySummary = createAsyncThunk(
  "timesheets/summary",
  async (month, { rejectWithValue }) => {
    try {
      const res = await api.get("/timesheets/summary", {
        params: { month }
      })
      return res.data
    } catch {
      return rejectWithValue("Failed to load summary")
    }
  }
)

// ✅ Pending approvals
export const fetchPendingApprovals = createAsyncThunk(
  "timesheets/pending",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/timesheets/pending")
      return res.data
    } catch {
      return rejectWithValue("Failed to load approvals")
    }
  }
)

// ✔ Approve / Reject
export const approveTimesheet = createAsyncThunk(
  "timesheets/approve",
  async ({ id, action, comment }, { rejectWithValue }) => {
    try {
      await api.post(`/timesheets/${id}/approve`, {
        action,
        comment
      })
      return { id, action }
    } catch {
      return rejectWithValue("Approval failed")
    }
  }
)

// 🕒 Audit timeline
export const fetchAuditTimeline = createAsyncThunk(
  "timesheets/audit",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/timesheets/${id}/audit`)
      return res.data
    } catch {
      return rejectWithValue("Failed to load audit timeline")
    }
  }
)

/* ================================
   SLICE
================================ */

const timesheetSlice = createSlice({
  name: "timesheets",
  initialState: {
    my: [],
    summary: null,
    pending: [],
    audit: [],
    loading: false,
    error: null
  },
  reducers: {
    clearTimesheetError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    /* ---------- addCase FIRST ---------- */

    builder
      .addCase(fetchMyTimesheets.fulfilled, (state, action) => {
        state.loading = false
        state.my = action.payload
      })
      .addCase(fetchMonthlySummary.fulfilled, (state, action) => {
        state.loading = false
        state.summary = action.payload
      })
      .addCase(fetchPendingApprovals.fulfilled, (state, action) => {
        state.loading = false
        state.pending = action.payload
      })
      .addCase(fetchAuditTimeline.fulfilled, (state, action) => {
        state.loading = false
        state.audit = action.payload
      })
      .addCase(saveTimesheet.fulfilled, (state, action) => {
        state.loading = false
        state.my.unshift(action.payload)
      })
      .addCase(submitTimesheet.fulfilled, (state, action) => {
        const ts = state.my.find(t => t._id === action.payload)
        if (ts) ts.status = "Submitted"
      })
      .addCase(approveTimesheet.fulfilled, (state, action) => {
        state.pending = state.pending.filter(
          p => p._id !== action.payload.id
        )
      })

    /* ---------- addMatcher AFTER addCase ---------- */

    builder
      .addMatcher(
        isAnyOf(
          saveTimesheet.pending,
          submitTimesheet.pending,
          fetchMyTimesheets.pending,
          fetchMonthlySummary.pending,
          fetchPendingApprovals.pending,
          approveTimesheet.pending,
          fetchAuditTimeline.pending
        ),
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(
          saveTimesheet.rejected,
          submitTimesheet.rejected,
          fetchMyTimesheets.rejected,
          fetchMonthlySummary.rejected,
          fetchPendingApprovals.rejected,
          approveTimesheet.rejected,
          fetchAuditTimeline.rejected
        ),
        (state, action) => {
          state.loading = false
          state.error = action.payload
        }
      )
  }
})

export const { clearTimesheetError } = timesheetSlice.actions
export default timesheetSlice.reducer
