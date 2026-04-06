import "./SprintCard.css";

const SprintCard = ({ sprint, onOpen }) => {
  return (
    <div className="sprintCard" onClick={() => onOpen?.(sprint)}>
      {/* Header */}
      <div className="sprintCard-header">
        <div>
          <h4>{sprint.name}</h4>
          <span className="sprint-project">{sprint.project}</span>
        </div>

        <span className="status active">Active</span>
      </div>

      {/* Description */}
      <p className="sprint-desc">
        Core feature development and enhancements
      </p>

      {/* Progress */}
      <div className="sprint-progress">
        <div
          className="progress-fill"
          style={{ width: `${sprint.progress}%` }}
        />
      </div>
      <span className="progress-label">{sprint.progress}%</span>

      {/* Stats */}
      <div className="sprint-stats">
        <span>To Do {sprint.stats.todo}</span>
        <span>In Progress {sprint.stats.progress}</span>
        <span>Done {sprint.stats.done}</span>
      </div>

      {/* Footer */}
      <div className="sprint-footer">
        <span>
          {sprint.start} – {sprint.end}
        </span>

        {sprint.overdue && (
          <span className="overdue">Overdue</span>
        )}
      </div>
    </div>
  );
};

export default SprintCard;
