import "./ProjectsTabs.css";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "teams", label: "Teams" },
  { id: "timeline", label: "Timeline" },
  { id: "settings", label: "Settings" }
];

const ProjectsTabs = ({ active, onChange }) => {
  return (
    <div className="projectsTabs">
      {tabs.map(t => (
        <button
          key={t.id}
          className={`projectsTab ${
            active === t.id ? "active" : ""
          }`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default ProjectsTabs;
