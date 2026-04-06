import GitActivity from "../models/GitActivity.js";
import FileActivity from "../models/FileActivity.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const getEmployeeProductivity = async ({ userId, orgId, from, to }) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const gitLogs = await GitActivity.find({ userId, orgId, timestamp: { $gte: fromDate, $lte: toDate } });
    const fileLogs = await FileActivity.find({ userId, orgId, recordedAt: { $gte: fromDate, $lte: toDate } });

    /* 1. Track IDE Time & Efficiency */
    let totalActiveMs = 0;
    let totalIdleMs = 0;
    let totalLinesModified = 0;
    const taskTimeMap = {}; // taskId -> { activeMs, idleMs }

    fileLogs.forEach(log => {
        totalActiveMs += log.activeTypingMs || 0;
        totalIdleMs += log.idleDurationMs || 0;
        totalLinesModified += log.linesModifiedCount || 0;

        if (log.taskId) {
            const tid = log.taskId.toString();
            if (!taskTimeMap[tid]) taskTimeMap[tid] = { activeMs: 0, idleMs: 0 };
            taskTimeMap[tid].activeMs += log.activeTypingMs || 0;
            taskTimeMap[tid].idleMs += log.idleDurationMs || 0;
        }
    });

    /* 2. Track GitHub Contributions */
    let commits = 0, prsOpened = 0, prsMerged = 0, reviews = 0;
    let totalLinesAdded = 0, totalLinesRemoved = 0;

    gitLogs.forEach(g => {
        if (g.activityType === "commit") {
            commits++;
            totalLinesAdded += g.linesAdded || 0;
            totalLinesRemoved += g.linesRemoved || 0;
        }
        if (g.activityType === "pr_open") prsOpened++;
        if (g.activityType === "pr_merge") prsMerged++;
        if (g.activityType === "review") reviews++;
    });

    /* 3. Productivity Score Calculation */
    const activeHours = totalActiveMs / (1000 * 60 * 60);
    const focusRatio = totalActiveMs / (totalActiveMs + totalIdleMs || 1);
    const codeChurn = totalLinesRemoved / (totalLinesAdded || 1);

    // Custom weights for productivity
    const score = Math.round(
        (activeHours * 5) +
        (commits * 2) +
        (prsMerged * 10) +
        (focusRatio * 20) -
        (codeChurn > 0.8 ? 10 : 0) // Penalty for extremely high rework/churn
    );

    return {
        overview: {
            score,
            totalActiveHours: activeHours.toFixed(2),
            focusRatio: (focusRatio * 100).toFixed(1) + "%",
            codeChurnRatio: codeChurn.toFixed(2),
            totalLinesModified,
            totalLinesAdded,
            totalLinesRemoved
        },
        github: { commits, prsOpened, prsMerged, reviews },
        taskBreakdown: taskTimeMap // Returns active/idle time spent per Task ObjectId
    };
};
