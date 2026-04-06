import Sprint from "../models/Sprint.js";

export const createSprint = async (req, res) => {
    try {
        const sprint = await Sprint.create({
            ...req.body,
            orgId: req.user.orgId,
            createdBy: req.user._id
        });
        res.status(201).json(sprint);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getSprintsByProject = async (req, res) => {
    try {
        const sprints = await Sprint.find({ project: req.params.projectId, orgId: req.user.orgId });
        res.json(sprints);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const updateSprintStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const sprint = await Sprint.findOneAndUpdate(
            { _id: req.params.id, orgId: req.user.orgId },
            { status },
            { new: true }
        );
        res.json(sprint);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
