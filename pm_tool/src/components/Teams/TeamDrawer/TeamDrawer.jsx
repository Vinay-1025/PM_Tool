import CapacityHeatmap from "../CapacityHeatmap/CapacityHeatmap";
import EditableUtilization from "../EditableUtilization/EditableUtilization";
import TeamAnalytics from "../TeamAnalytics/TeamAnalytics";
import "./TeamDrawer.css";

const TeamDrawer = ({ team, onClose, onUpdateUtil }) => {
  if (!team) return null;

  return (
    <div className="teamDrawer-backdrop" onClick={onClose}>
      <aside className="teamDrawer" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="teamDrawer-header">
          <h3>{team.name}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Content */}
        <div className="teamDrawer-content">

          {/* Members */}
          <section className="drawer-card">
            <h4>Members</h4>

            <div className="member-list">
              {team.members.map(m => (
                <div key={m.name} className="member-row">
                  <span className="avatar primary">{m.initials}</span>

                  <div className="member-info">
                    <span className="member-name">{m.name}</span>
                    <span className={`role ${m.role.toLowerCase()}`}>
                      {m.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Utilization */}
          <section className="drawer-card">
            <EditableUtilization
  value={team.utilization}
  onChange={val => onUpdateUtil(team._id, Number(val))}
/>

<CapacityHeatmap
  members={team.members.map(m => ({
    name: m.user?.name,
    initials: m.user?.name?.slice(0, 2).toUpperCase(),
    capacity: m.capacity
  }))}
/>

          </section>


          {/* Analytics */}
          <section className="drawer-card">
            <TeamAnalytics />
          </section>

        </div>
      </aside>
    </div>
  );
};

export default TeamDrawer;
