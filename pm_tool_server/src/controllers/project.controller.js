import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find({ orgId: req.user.orgId })
    .populate("projectManager", "name email")
    .populate({
      path: "teams",
      populate: { path: "members.user", select: "name avatarUrl" }
    })
    .populate("sprints")
    .populate("releases")
    .populate("tasks");

  res.json(projects);
};

export const createProject = async (req, res) => {
  const project = await Project.create({
    ...req.body,
    orgId: req.user.orgId,
    createdBy: req.user._id
  });

  res.status(201).json(project);
};

export const updateProjectProgress = async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, orgId: req.user.orgId },
    { progress: req.body.progress },
    { new: true }
  );

  res.json(project);
};
