import { FiGrid, FiList } from "react-icons/fi";
import "./ProjectsToolbar.css";

const ProjectsToolbar = ({ view, setView }) => {
  return (
    <div className="projectsToolbar">
      <input
        className="projectsToolbar-search"
        placeholder="Search projects..."
      />

      <select>
        <option>All Status</option>
        <option>Active</option>
        <option>Completed</option>
      </select>

      <select>
        <option>All Types</option>
        <option>Agile</option>
        <option>Waterfall</option>
      </select>

      <div className="projectsToolbar-view">
        <button
          className={view === "grid" ? "active" : ""}
          onClick={() => setView("grid")}
        >
          <FiGrid />
        </button>
        <button
          className={view === "list" ? "active" : ""}
          onClick={() => setView("list")}
        >
          <FiList />
        </button>
      </div>
    </div>
  );
};

export default ProjectsToolbar;
