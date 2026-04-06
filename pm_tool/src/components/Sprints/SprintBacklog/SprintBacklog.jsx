import "./SprintBacklog.css";

const SprintBacklog = ({ tasks }) => {
  return (
    <section className="backlog-card">
      <h4>Sprint Backlog</h4>

      <div className="backlog-list">
        {tasks.map(task => (
          <div key={task.id} className="backlog-item">
            <span>{task.title}</span>
            <span className="pts">{task.points} pts</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SprintBacklog;
