import Release from "../models/Release.js";
import Task from "../models/Task.js";

export const createRelease = async (req, res) => {
    try {
        const release = await Release.create({
            ...req.body,
            orgId: req.user.orgId,
            createdBy: req.user._id
        });
        res.status(201).json(release);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getReleasesByProject = async (req, res) => {
    try {
        const releases = await Release.find({ project: req.params.projectId, orgId: req.user.orgId });
        // Also attach counts of tasks tied to each release
        const payload = await Promise.all(
            releases.map(async (r) => {
                const taskCount = await Task.countDocuments({ release: r._id });
                return { ...r.toObject(), taskCount };
            })
        );
        res.json(payload);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
