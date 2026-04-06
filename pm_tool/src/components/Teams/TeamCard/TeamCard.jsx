import "./TeamCard.css";

const TeamCard = ({ team, onOpen }) => {
  return (
    <div className="teamCard" onClick={() => onOpen(team)}>
      {/* Title */}
      <h4 className="teamCard-title">{team.name}</h4>

      {/* Pills */}
      <div className="teamCard-pills">
        <span>{team.members.length} members</span>
        <span>{team.projects} projects</span>
        <span>{team.sprints} sprints</span>
      </div>

      {/* Lead */}
      <div className="teamCard-section">
        <span className="label">Team Lead</span>
        <div className="lead-row">
          <span className="avatar primary">{team.lead.initials}</span>
          <span>{team.lead.name}</span>
        </div>
      </div>

      {/* Members */}
      <div className="teamCard-section">
        <span className="label">Team Members</span>
        <div className="avatars-row">
          {team.members.map(m => (
            <span key={m.initials} className="avatar">
              {m.initials}
            </span>
          ))}
        </div>
      </div>

      {/* Utilization */}
      <div className="teamCard-util">
        <div className="util-header">
          <span>Utilization</span>
          <span>{team.utilization}%</span>
        </div>

        <div className="util-bar">
          <div
            className="util-fill"
            style={{ width: `${team.utilization}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
