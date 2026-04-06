import { FiPlus } from "react-icons/fi";
import "./TaskToolbar.css";

const TaskToolbar = ({ onCreate }) => {
  return (
    <div className="taskToolbar">
      <div className="filters">
        <select>
          <option>All Priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select>
          <option>All Status</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Review</option>
          <option>Done</option>
        </select>
      </div>

      <button className="createBtn" onClick={onCreate}>
        <FiPlus /> New Task
      </button>
    </div>
  );
};

export default TaskToolbar;
