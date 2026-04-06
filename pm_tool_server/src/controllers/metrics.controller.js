import {
  getGithubMetricsForUser,
  calculateGithubScore
} from "../services/githubMetrics.service.js"
import { getEmployeeProductivity } from "../services/productivityAnalyzer.service.js"

export const myGithubMetrics = async (req, res) => {
  const { from, to } = req.query

  const metrics = await getGithubMetricsForUser({
    userId: req.user._id,
    from,
    to
  })

  res.json({
    metrics,
    score: calculateGithubScore(metrics)
  })
}

export const myProductivityDashboard = async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) return res.status(400).json({ message: "Date range required" });

    const productivity = await getEmployeeProductivity({
      userId: req.user._id,
      orgId: req.user.orgId,
      from,
      to
    });

    res.json(productivity);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
