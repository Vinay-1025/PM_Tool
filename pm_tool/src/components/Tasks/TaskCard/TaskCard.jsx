import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { FaArrowUp, FaArrowDown, FaEquals } from "react-icons/fa"
import "./TaskCard.css"

const priorityIcon = {
  high: <FaArrowUp />,
  medium: <FaEquals />,
  low: <FaArrowDown />
}

const TaskCard = ({ task, columnId, isOverlay }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useDraggable({
    id: task._id,
    data: { column: columnId }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 180ms cubic-bezier(0.22,1,0.36,1)",
    opacity: isDragging ? 0.85 : 1,
    boxShadow: isDragging
      ? "0 24px 48px rgba(0,0,0,0.25)"
      : undefined,
    cursor: isDragging ? "grabbing" : "grab"
  }

  const creator =
    task.createdBy && typeof task.createdBy === "object"
      ? task.createdBy
      : null

  const initials = creator?.name
    ? creator.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?"

  const due = task.dueDate ? new Date(task.dueDate) : null
  const overdue = due && due < new Date()

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`taskCard ${task.priority} ${isOverlay ? "overlay" : ""}`}
    >
      {/* Priority bar */}
      <div className="taskCard-priorityBar" />

      {/* Header */}
      <div className="taskCard-header">
        <div className="taskCard-tags">
          {task.taskKey && (
            <span className="taskCard-tag">{task.taskKey}</span>
          )}
        </div>

        <div className={`taskCard-priorityIcon ${task.priority}`}>
          {priorityIcon[task.priority]}
        </div>
      </div>

      {/* Content */}
      <div className="taskCard-title">{task.title}</div>
      {task.description && (
        <div className="taskCard-description">
          {task.description}
        </div>
      )}

      {/* Footer */}
      <div className="taskCard-footer">
        <div
          className="taskCard-avatar"
          title={creator?.name || "Unknown"}
        >
          {creator?.avatarUrl ? (
            <img
              src={creator.avatarUrl}
              alt={creator.name}
            />
          ) : (
            initials
          )}
        </div>

        {due && (
          <div
            className={`taskCard-date ${overdue ? "overdue" : ""}`}
          >
            {due.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric"
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
