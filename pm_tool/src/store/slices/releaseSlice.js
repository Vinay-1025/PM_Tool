import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/releases';

export const fetchProjectReleases = createAsyncThunk(
    'releases/fetchProjectReleases',
    async (projectId, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const res = await axios.get(`${API_URL}/project/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch releases');
        }
    }
);

export const createRelease = createAsyncThunk(
    'releases/createRelease',
    async (releaseData, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const res = await axios.post(API_URL, releaseData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to create release');
        }
    }
);

const releaseSlice = createSlice({
    name: 'releases',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectReleases.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjectReleases.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchProjectReleases.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createRelease.fulfilled, (state, action) => {
                state.list.push(action.payload);
            });
    }
});

export default releaseSlice.reducer;
