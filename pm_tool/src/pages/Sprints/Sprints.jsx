import { useState } from "react";
import { useSelector } from "react-redux";
import "./Sprints.css";
import SprintsHeader from "../../components/Sprints/SprintsHeader/SprintsHeader";
import SprintsToolbar from "../../components/Sprints/SprintsToolbar/SprintsToolbar";
import SprintCard from "../../components/Sprints/SprintCard/SprintCard";
import SprintDrawer from "../../components/Sprints/SprintDrawer/SprintDrawer";

const Sprints = () => {
  const [activeSprint, setActiveSprint] = useState(null);
  const projects = useSelector((state) => state.projects?.list || []);

  const allSprints = projects.flatMap((p) =>
    (p.sprints || []).map((s) => ({
      ...s,
      projectName: p.name,
      stats: { todo: 10, progress: 8, done: 5 }, // Mocked for now, pending Tasks integration
      backlog: []
    }))
  );

  return (
    <div className="sprints-page">
      <SprintsHeader />
      <SprintsToolbar />

      <div className="sprints-grid">
        {allSprints.length === 0 && <p style={{ color: "var(--text-muted)" }}>No active sprints across projects.</p>}
        {allSprints.map(sprint => (
          <SprintCard
            key={sprint._id || sprint.id}
            sprint={{
              ...sprint,
              project: sprint.projectName,
              start: new Date(sprint.startDate).toLocaleDateString(),
              end: new Date(sprint.endDate).toLocaleDateString()
            }}
            onOpen={setActiveSprint}
          />
        ))}
      </div>

      <SprintDrawer
        sprint={activeSprint}
        onClose={() => setActiveSprint(null)}
      />
    </div>
  );
};

export default Sprints;
