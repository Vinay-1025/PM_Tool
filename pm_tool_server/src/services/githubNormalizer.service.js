import RawEvent from "../models/RawEvent.js"
import GitActivity from "../models/GitActivity.js"
import User from "../models/User.js"
import Task from "../models/Task.js"

const TODO_REGEX = /AZPM-\d+/g

export const normalizeGithubEvent = async (rawEvent) => {
  const { eventType, payload } = rawEvent

  const senderId = payload?.sender?.id
  if (!senderId) {
    rawEvent.processed = true
    await rawEvent.save()
    return
  }

  const user = await User.findOne({
    "github.githubUserId": senderId
  })

  // If GitHub user not linked → mark processed & exit
  if (!user) {
    rawEvent.processed = true
    await rawEvent.save()
    return
  }

  const activities = []

  /* =========================
     PUSH EVENT
  ========================= */
  if (eventType === "push") {
    const repo = payload.repository?.name
    const branch = payload.ref?.replace("refs/heads/", "")

    for (const commit of payload.commits || []) {
      const taskKey = commit.message.match(TODO_REGEX)?.[0]

      const filesChanged = [
        ...(commit.added || []),
        ...(commit.removed || []),
        ...(commit.modified || [])
      ]

      let task = null
      if (taskKey) {
        task = await Task.findOne({
          taskKey,
          orgId: user.orgId
        })
      }

      activities.push({
        userId: user._id,
        orgId: user.orgId,
        repo,
        branch,
        activityType: "commit",
        referenceId: commit.id,
        todoId: taskKey || null,
        taskId: task?._id || null,
        filesChanged,
        timestamp: new Date(commit.timestamp)
      })
    }
  }

  /* =========================
     PULL REQUEST EVENT
  ========================= */
  if (eventType === "pull_request") {
    const pr = payload.pull_request

    if (payload.action === "opened") {
      activities.push({
        userId: user._id,
        orgId: user.orgId,
        repo: payload.repository?.name,
        branch: pr.head?.ref,
        activityType: "pr_open",
        referenceId: pr.number.toString(),
        timestamp: new Date(pr.created_at)
      })
    }

    if (payload.action === "closed" && pr.merged) {
      const prTaskKey = pr.title.match(TODO_REGEX)?.[0] || pr.head?.ref?.match(TODO_REGEX)?.[0];
      let prTaskId = null;

      if (prTaskKey) {
        const linkedTask = await Task.findOne({ taskKey: prTaskKey, orgId: user.orgId });
        if (linkedTask) {
          prTaskId = linkedTask._id;
          linkedTask.status = "done";
          await linkedTask.save();
        }
      }

      activities.push({
        userId: user._id,
        orgId: user.orgId,
        repo: payload.repository?.name,
        branch: pr.base?.ref,
        activityType: "pr_merge",
        referenceId: pr.number.toString(),
        todoId: prTaskKey || null,
        taskId: prTaskId,
        timestamp: new Date(pr.merged_at)
      })
    }
  }

  /* =========================
     REVIEW EVENT
  ========================= */
  if (eventType === "pull_request_review") {
    activities.push({
      userId: user._id,
      orgId: user.orgId,
      repo: payload.repository?.name,
      branch: payload.pull_request?.base?.ref,
      activityType: "review",
      referenceId: payload.pull_request?.number?.toString(),
      timestamp: new Date(payload.review?.submitted_at)
    })
  }

  if (activities.length) {
    await GitActivity.insertMany(activities)
  }

  rawEvent.processed = true
  await rawEvent.save()
}
