import { useState } from "react";
import { FiMoreVertical, FiPlusCircle, FiTruck, FiClock, FiTarget, FiCheckSquare } from "react-icons/fi";
import "./ProjectCard.css";

const ProjectCard = ({ project, onAddSprint, onAddRelease, onLogTime }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="projectCard">
      {/* Header */}
      <div className="projectCard-header">
        <h4 className="projectCard-title">{project.name}</h4>

        <button
          className="projectCard-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMoreVertical />
        </button>

        {menuOpen && (
          <div className="projectCard-menuDropdown">
            <button>Edit</button>
            <hr />
            <button
              title="Plan a new sprint for this project."
              onClick={() => { setMenuOpen(false); onAddSprint(project); }}
            >
              <FiPlusCircle /> Add Sprint
            </button>
            <button
              title="Draft a new feature release."
              onClick={() => { setMenuOpen(false); onAddRelease(project); }}
            >
              <FiTruck /> Add Release
            </button>
            <button
              title="Log timesheets against this project"
              onClick={() => { setMenuOpen(false); onLogTime(project); }}
            >
              <FiClock /> Log Time
            </button>
            <hr />
            <button className="danger">Archive</button>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="projectCard-statusRow">
        <span className={`status-pill ${project.status.toLowerCase()}`}>
          {project.status}
        </span>
        <span
          className={`health-pill ${project.health === "On Track" ? "good" : "risk"
            }`}
        >
          {project.health}
        </span>
      </div>

      {/* Description */}
      <p className="projectCard-desc">{project.description}</p>

      {/* Progress */}
      <div className="projectCard-progressWrap">
        <div className="projectCard-progress">
          <div
            className="projectCard-progressFill"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="projectCard-progressValue">
          {project.progress}%
        </span>
      </div>

      <div className="projectCard-metricsRow">
        <span className="metric-chip"><FiTarget /> {project.sprintCount} Sprints</span>
        <span className="metric-chip"><FiCheckSquare /> {project.taskCount} Tasks</span>
        <span className="metric-chip"><FiTruck /> {project.releaseCount} Releases</span>
      </div>

      {/* Dates + Method */}
      <div className="projectCard-metaRow">
        <span className="projectCard-dates">{project.dates}</span>
        <span className="projectCard-method">{project.methodology}</span>
      </div>

      {/* Footer */}
      <div className="projectCard-footer">
        <span className="projectCard-pm">PM: {project.manager}</span>

        <div className="projectCard-avatars">
          {project.members.map((m, i) => (
            <span
              key={i}
              className={`avatar ${i === 0 ? "primary" : "secondary"}`}
              title={m}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
