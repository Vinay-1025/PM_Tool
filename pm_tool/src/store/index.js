import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import tasksReducer from "./slices/tasksSlice"
import teamsReducer from "./slices/teamSlice"
import usersReducer from "./slices/userSlice"
import projectsReducer from "./slices/projectSlice"
import timesheetReducer from "./slices/timesheetSlice"
import sprintsReducer from "./slices/sprintSlice"
import releasesReducer from "./slices/releaseSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    teams: teamsReducer,
    users: usersReducer,
    projects: projectsReducer,
    timesheets: timesheetReducer,
    sprints: sprintsReducer,
    releases: releasesReducer
  }
})
