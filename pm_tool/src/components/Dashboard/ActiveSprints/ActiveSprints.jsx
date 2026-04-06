import { FiArrowRight } from "react-icons/fi";
import "./ActiveSprints.css";

const sprints = [
  {
    name: "Sprint 8",
    desc: "E-commerce platform redesign",
    progress: 75,
    days: "6–7 days left",
  },
  {
    name: "Sprint 4",
    desc: "User onboarding improvements",
    progress: 20,
    days: "6–7 days left",
  },
  {
    name: "Sprint 6",
    desc: "Cloud migration phase",
    progress: 0,
    days: "6–7 days left",
  },
];

const ActiveSprints = () => {
  return (
    <div className="activeSprints-card">
      <div className="activeSprints-header">
        <h4>Active Sprints</h4>
        <FiArrowRight />
      </div>

      <div className="activeSprints-list">
        {sprints.map((sprint) => (
          <div key={sprint.name} className="activeSprints-item">
            <div className="activeSprints-info">
              <span className="activeSprints-name">{sprint.name}</span>
              <span className="activeSprints-desc">{sprint.desc}</span>
            </div>

            <div className="activeSprints-meta">
              <span className="activeSprints-days">{sprint.days}</span>
              <div className="activeSprints-progress">
                <div
                  className="activeSprints-progressFill"
                  style={{ width: `${sprint.progress}%` }}
                />
              </div>
              <span className="activeSprints-percent">
                {sprint.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveSprints;
