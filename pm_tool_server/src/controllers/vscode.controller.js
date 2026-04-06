import Task from "../models/Task.js";
import VSCodeSession from "../models/VSCodeSession.js";
import FileActivity from "../models/FileActivity.js";

/**
 * Fetch tasks for VS Code
 * Used by extension sidebar / quick pick
 */
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      orgId: req.user.orgId
    })
      .select("title status priority taskKey dueDate")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error("❌ VS Code getMyTasks error:", err);
    res.status(500).json({ message: "Failed to load tasks" });
  }
};

export const startSession = async (req, res) => {
  try {
    const { workspace, taskId } = req.body;
    const session = await VSCodeSession.create({
      userId: req.user._id,
      orgId: req.user.orgId,
      taskId: taskId || null,
      workspace
    });
    res.json({ success: true, sessionId: session._id, startedAt: session.startedAt });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const heartbeat = async (req, res) => {
  try {
    const { sessionId } = req.body;
    await VSCodeSession.findByIdAndUpdate(sessionId, { lastHeartbeat: new Date() });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false });
  }
};

export const recordFileActivity = async (req, res) => {
  try {
    const { activities } = req.body; // Array of file activity metrics
    if (!activities || !Array.isArray(activities)) return res.status(400).json({ message: "Invalid payload" });

    const enrichedActivities = activities.map(act => ({
      ...act,
      userId: req.user._id,
      orgId: req.user.orgId,
      recordedAt: new Date()
    }));

    await FileActivity.insertMany(enrichedActivities);
    res.json({ recorded: true, count: enrichedActivities.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
