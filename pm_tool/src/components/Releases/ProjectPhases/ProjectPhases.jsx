import "./ProjectPhases.css";

const phases = [
  {
    project: "Data Analytics Dashboard",
    current: "Design",
    phases: ["Planning", "Design", "Development", "Testing"],
  },
  {
    project: "CRM System Integration",
    current: "Deployment",
    phases: ["Design", "Development", "Deployment"],
  },
];

const ProjectPhases = () => {
  return (
    <div className="projectPhases-grid">
      {phases.map(p => (
        <div key={p.project} className="projectPhase-card">
          <h4>{p.project}</h4>
          <p className="current">
            Current Phase: <strong>{p.current}</strong>
          </p>

          <div className="phase-list">
            {p.phases.map(phase => (
              <span
                key={phase}
                className={`phase-pill ${
                  phase === p.current ? "active" : ""
                }`}
              >
                {phase}
              </span>
            ))}
          </div>

          <div className="phase-actions">
            <button className="btn-outline">+ Add Phase</button>
            <button className="btn-outline">Manage</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectPhases;
