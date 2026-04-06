import Task from "../models/Task.js"

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ orgId: req.user.orgId })
    .populate("createdBy", "name email avatarUrl")

  res.json(tasks)
}

export const createTask = async (req, res) => {
  try {
    if (!req.user?.orgId) {
      return res.status(400).json({
        success: false,
        message: "Organization not found"
      });
    }

    const task = await Task.create({
      ...req.body,

      taskKey:
        req.body.taskKey ||
        `AZPM-${Date.now().toString().slice(-4)}`,

      orgId: req.user.orgId,
      createdBy: req.user._id
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Create Task Error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const updateTaskDueDate = async (req, res) => {
  const { dueDate, comment } = req.body;

  if (!comment) {
    return res.status(400).json({
      success: false,
      message: "Comment is required for date change"
    });
  }

  const task = await Task.findOne({
    _id: req.params.id,
    orgId: req.user.orgId
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const oldDate = task.dueDate;

  task.dueDate = dueDate;
  await task.save();

  await TaskAudit.create({
    taskId: task._id,
    action: "DATE_CHANGED",
    oldValue: { dueDate: oldDate },
    newValue: { dueDate },
    comment,
    changedBy: req.user._id,
    orgId: req.user.orgId
  });

  res.json(task);
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, orgId: req.user.orgId },
      { status },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const assignToSprint = async (req, res) => {
  try {
    const { sprintId } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, orgId: req.user.orgId },
      { sprint: sprintId },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const linkTasks = async (req, res) => {
  try {
    const { targetTaskId, linkType } = req.body;
    const task = await Task.findOne({ _id: req.params.id, orgId: req.user.orgId });

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.linkedTasks.push({ task: targetTaskId, linkType });
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
