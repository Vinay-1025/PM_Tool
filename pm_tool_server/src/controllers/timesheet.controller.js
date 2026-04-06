import Timesheet from "../models/Timesheet.js"
import TimesheetAudit from "../models/TimesheetAudit.js"
import Holiday from "../models/Holiday.js"
import mongoose from "mongoose"

/* ================================
   HELPERS
================================ */

const calculateTotalMinutes = (items = []) =>
  items.reduce((sum, i) => sum + (i.minutes || 0), 0)

/* ================================
   CREATE / UPDATE TIMESHEET
================================ */

export const upsertTimesheet = async (req, res) => {
  const { date, workStatus, items } = req.body

  if (!date || !workStatus) {
    return res.status(400).json({ message: "Date & work status required" })
  }

  const totalMinutes = calculateTotalMinutes(items)

  const timesheet = await Timesheet.findOneAndUpdate(
    {
      user: req.user._id,
      date: new Date(date)
    },
    {
      user: req.user._id,
      orgId: req.user.orgId,
      date: new Date(date),
      workStatus,
      items,
      totalMinutes,
      status: "draft"
    },
    { new: true, upsert: true }
  )

  await TimesheetAudit.create({
    timesheet: timesheet._id,
    action: "created",
    by: req.user._id
  })

  res.status(201).json(timesheet)
}

/* ================================
   SUBMIT TIMESHEET
================================ */

export const submitTimesheet = async (req, res) => {
  const timesheet = await Timesheet.findById(req.params.id)

  if (!timesheet) {
    return res.status(404).json({ message: "Timesheet not found" })
  }

  if (!timesheet.user.equals(req.user._id)) {
    return res.status(403).json({ message: "Not allowed" })
  }

  timesheet.status = "submitted"
  timesheet.submittedAt = new Date()
  await timesheet.save()

  await TimesheetAudit.create({
    timesheet: timesheet._id,
    action: "submitted",
    by: req.user._id
  })

  res.json({ message: "Timesheet submitted" })
}

/* ================================
   GET MY TIMESHEETS (MANAGE)
================================ */

export const getMyTimesheets = async (req, res) => {
  const { month, status } = req.query

  const start = month
    ? new Date(`${month}-01`)
    : new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  const end = new Date(start)
  end.setMonth(end.getMonth() + 1)

  const query = {
    user: req.user._id,
    date: { $gte: start, $lt: end }
  }

  if (status && status !== "All") query.status = status

  const data = await Timesheet.find(query)
    .populate("items.project", "name")
    .populate("items.release", "name version")
    .populate("items.todo", "title taskKey status")
    .sort({ date: -1 })
    .lean()

  res.json(data)
}

/* ================================
   MONTHLY SUMMARY
================================ */

export const getMonthlySummary = async (req, res) => {
  const { month } = req.query

  const start = new Date(`${month}-01`)
  const end = new Date(start)
  end.setMonth(end.getMonth() + 1)

  const summary = await Timesheet.aggregate([
    {
      $match: {
        user: req.user._id,
        date: { $gte: start, $lt: end }
      }
    },
    {
      $group: {
        _id: null,
        days: { $sum: 1 },
        minutes: { $sum: "$totalMinutes" },
        leaves: {
          $sum: {
            $cond: [{ $eq: ["$workStatus", "leave"] }, 1, 0]
          }
        }
      }
    }
  ])

  const holidays = await Holiday.countDocuments({
    date: { $gte: start, $lt: end },
    $or: [{ orgId: req.user.orgId }, { orgId: null }]
  })

  res.json({
    days: summary[0]?.days || 0,
    hours: `${Math.floor((summary[0]?.minutes || 0) / 60)}h`,
    leaves: summary[0]?.leaves || 0,
    holidays
  })
}

/* ================================
   PENDING APPROVALS (MANAGER)
================================ */

export const getPendingApprovals = async (req, res) => {
  if (!["manager", "team_lead", "project_manager"].includes(req.user.role)) {
    return res.status(403).json({ message: "Not allowed" })
  }

  const timesheets = await Timesheet.find({
    orgId: req.user.orgId,
    status: "submitted"
  })
    .populate("user", "name")
    .populate("items.project", "name")
    .populate("items.release", "name version")
    .populate("items.todo", "title taskKey")
    .sort({ date: -1 })

  res.json(timesheets)
}

/* ================================
   APPROVE / REJECT
================================ */

export const approveTimesheet = async (req, res) => {
  const { action, comment } = req.body

  if (!["approved", "rejected"].includes(action)) {
    return res.status(400).json({ message: "Invalid action" })
  }

  const timesheet = await Timesheet.findById(req.params.id)

  if (!timesheet) {
    return res.status(404).json({ message: "Timesheet not found" })
  }

  timesheet.status = action
  timesheet.approvedBy = req.user._id
  timesheet.approvedAt = new Date()
  await timesheet.save()

  await TimesheetAudit.create({
    timesheet: timesheet._id,
    action,
    by: req.user._id,
    comment
  })

  res.json({ message: `Timesheet ${action}` })
}

/* ================================
   AUDIT TIMELINE
================================ */

export const getAuditTimeline = async (req, res) => {
  const logs = await TimesheetAudit.find({
    timesheet: req.params.id
  })
    .populate("by", "name")
    .sort({ createdAt: 1 })

  res.json(logs)
}
