import { FiSearch, FiColumns, FiCalendar } from "react-icons/fi";
import "./TaskHeader.css";

const TaskHeader = ({ view, onViewChange }) => {
  return (
    <div className="taskHeader">
      <div className="taskHeader-left">
        <h2>Tasks</h2>
        <p>Plan, track, and manage work</p>
      </div>

      <div className="taskHeader-right">
        <div className="searchBox">
          <FiSearch />
          <input placeholder="Search by keyword..." />
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
