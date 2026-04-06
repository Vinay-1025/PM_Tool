import "./ProjectsHeader.css";

const ProjectsHeader = ({ onCreate }) => {
  return (
    <div className="projectsHeader">
      <div>
        <h2>Projects</h2>
        <p>Manage and track all your projects in one place</p>
      </div>

      <button
        className="projectsHeader-btn"
        onClick={onCreate}   // ✅ FIX
      >
        + New Project
      </button>
    </div>
  );
};

export default ProjectsHeader;
