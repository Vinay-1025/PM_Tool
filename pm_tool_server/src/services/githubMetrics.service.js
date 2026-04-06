import GitActivity from "../models/GitActivity.js"

export const getGithubMetricsForUser = async ({ userId, from, to }) => {
  const activities = await GitActivity.find({
    userId,
    timestamp: {
      $gte: new Date(from),
      $lte: new Date(to)
    }
  })

  const m = {
    commits: 0,
    taskLinkedCommits: 0,
    prOpened: 0,
    prMerged: 0,
    reviews: 0
  }

  for (const a of activities) {
    if (a.activityType === "commit") {
      m.commits++
      if (a.taskId) m.taskLinkedCommits++
    }
    if (a.activityType === "pr_open") m.prOpened++
    if (a.activityType === "pr_merge") m.prMerged++
    if (a.activityType === "review") m.reviews++
  }

  m.taskCoverage =
    m.commits === 0
      ? 0
      : Math.round((m.taskLinkedCommits / m.commits) * 100)

  return m
}

export const calculateGithubScore = (m) =>
  Math.round(
    m.commits * 1 +
    m.prOpened * 2 +
    m.prMerged * 3 +
    m.reviews * 1.5 +
    m.taskCoverage * 0.2
  )
