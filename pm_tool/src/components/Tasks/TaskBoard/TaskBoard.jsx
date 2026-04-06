import { DndContext, closestCorners } from "@dnd-kit/core"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import TaskColumn from "../TaskColumn/TaskColumn"
import { fetchTasks, updateTaskStatus } from "../../../store/slices/tasksSlice"
import "./TaskBoard.css"

const TaskBoard = () => {
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.tasks)

    // Fetch tasks on load
    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])

    // Group tasks by status
    const groupedTasks = {
        todo: tasks.filter((t) => t.status === "todo"),
        progress: tasks.filter((t) => t.status === "progress"),
        review: tasks.filter((t) => t.status === "review"),
        blocked: tasks.filter((t) => t.status === "blocked"),
        done: tasks.filter((t) => t.status === "done")
    }

    const handleDragEnd = ({ active, over }) => {
        if (!over) return

        const toStatus = over.id
        const taskId = active.id

        const draggedTask = tasks.find((t) => t._id === taskId)
        if (!draggedTask || draggedTask.status === toStatus) return

        dispatch(
            updateTaskStatus({
                taskId,
                status: toStatus
            })
        )
    }


    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="taskBoard">
                <TaskColumn title="To Do" columnId="todo" tasks={groupedTasks.todo} />
                <TaskColumn title="In Progress" columnId="progress" tasks={groupedTasks.progress} />
                <TaskColumn title="In Review" columnId="review" tasks={groupedTasks.review} />
                <TaskColumn title="Blocked" columnId="blocked" tasks={groupedTasks.blocked} />
                <TaskColumn title="Done" columnId="done" tasks={groupedTasks.done} />
            </div>
        </DndContext>
    )
}

export default TaskBoard
