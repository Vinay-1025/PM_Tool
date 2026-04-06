import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/sprints';

export const fetchProjectSprints = createAsyncThunk(
    'sprints/fetchProjectSprints',
    async (projectId, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const res = await axios.get(`${API_URL}/project/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch sprints');
        }
    }
);

export const createSprint = createAsyncThunk(
    'sprints/createSprint',
    async (sprintData, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const res = await axios.post(API_URL, sprintData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to create sprint');
        }
    }
);

const sprintSlice = createSlice({
    name: 'sprints',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectSprints.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjectSprints.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchProjectSprints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createSprint.fulfilled, (state, action) => {
                state.list.push(action.payload);
            });
    }
});

export default sprintSlice.reducer;
