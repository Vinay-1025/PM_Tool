import { useSelector } from "react-redux";
import "./TeamMembers.css";

const TeamMembers = () => {
  const teams = useSelector(state => state.teams.list || []);

  // Flatten members with team context
  const members = teams.flatMap(team =>
    team.members.map(m => ({
      id: `${team._id}-${m.user?._id}`,
      name: m.user?.name || "Unknown",
      role: m.role,
      teamName: team.name,
      capacity: m.capacity
    }))
  );

  if (!members.length) {
    return (
      <div className="teamMembers-empty">
        No team members found
      </div>
    );
  }

  return (
    <div className="teamMembers-page">
      <div className="teamMembers-grid">
        {members.map(m => (
          <div key={m.id} className="memberCard">
            <div className="memberCard-header">
              <div className="memberAvatar">
                {m.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="memberInfo">
                <h4>{m.name}</h4>
                <span className={`role-pill ${m.role}`}>
                  {m.role}
                </span>
              </div>
            </div>

            <div className="memberMeta">
              <div>
                <span className="label">Team</span>
                <span>{m.teamName}</span>
              </div>

              <div>
                <span className="label">Capacity</span>
                <span>{m.capacity}%</span>
              </div>
            </div>

            <div className="capacityBar">
              <div
                className={`capacityFill ${
                  m.capacity > 80 ? "high" : ""
                }`}
                style={{ width: `${m.capacity}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
