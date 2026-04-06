import "./TaskDrawer.css"

const TaskDrawer = ({ open, onClose, children }) => {
  if (!open) return null

  return (
    <div className="taskDrawer-overlay" onClick={onClose}>
      <div
        className="taskDrawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="taskDrawer-header">
          <h3>Create Task</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="taskDrawer-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default TaskDrawer
