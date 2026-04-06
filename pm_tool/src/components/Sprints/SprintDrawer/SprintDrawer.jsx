import SprintVelocityChart from "../SprintVelocityChart/SprintVelocityChart";
import SprintBurndownChart from "../SprintBurndownChart/SprintBurndownChart";
import SprintBacklog from "../SprintBacklog/SprintBacklog";
import "./SprintDrawer.css";

const SprintDrawer = ({ sprint, onClose }) => {
  if (!sprint) return null;

  return (
    <div className="sprintDrawer-backdrop" onClick={onClose}>
      <aside
        className="sprintDrawer"
        onClick={e => e.stopPropagation()}
      >
        <header className="sprintDrawer-header">
          <div>
            <h3>{sprint.name}</h3>
            <span className="muted">{sprint.project}</span>
          </div>
          <button onClick={onClose}>✕</button>
        </header>

        <SprintVelocityChart />
        <SprintBurndownChart />
        <SprintBacklog tasks={sprint.backlog} />
      </aside>
    </div>
  );
};

export default SprintDrawer;
