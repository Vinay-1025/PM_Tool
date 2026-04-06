import { useDroppable } from "@dnd-kit/core"
import TaskCard from "../TaskCard/TaskCard"
import "./TaskColumn.css"

const TaskColumn = ({ title, tasks, columnId }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
    data: { column: columnId }
  })

  return (
    <div
      ref={setNodeRef}
      className={`taskColumn ${isOver ? "column-over" : ""}`}
    >
      <div className="taskColumn-header">
        <span className="taskColumn-title">{title}</span>
        <span className="taskColumn-count">{tasks.length}</span>
      </div>

      <div className="taskColumn-divider" />

      <div className="taskColumn-list">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            columnId={columnId}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskColumn
