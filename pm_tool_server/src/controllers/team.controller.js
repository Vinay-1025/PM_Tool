import Team from "../models/Team.js";

export const getTeams = async (req, res) => {
  const teams = await Team.find({ orgId: req.user.orgId })
    .populate("lead", "name email avatarUrl")
    .populate("members.user", "name email avatarUrl")
    .populate({
      path: "projects",
      select: "name status health",
      populate: { path: "sprints", select: "name status velocity" }
    });

  res.json(teams);
};

export const createTeam = async (req, res) => {
  const team = await Team.create({
    ...req.body,
    orgId: req.user.orgId,
    createdBy: req.user._id
  });

  res.status(201).json(team);
};

export const updateTeamUtilization = async (req, res) => {
  const team = await Team.findOneAndUpdate(
    { _id: req.params.id, orgId: req.user.orgId },
    { utilization: req.body.utilization },
    { new: true }
  );

  res.json(team);
};
