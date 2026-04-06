import { useSelector } from "react-redux";
import CapacityHeatmap from "../CapacityHeatmap/CapacityHeatmap";

const TeamCapacity = () => {
  const teams = useSelector(state => state.teams.list);

  return (
    <div className="teams-grid">
      {teams.map(team => (
        <div key={team._id} className="drawer-card">
          <h4>{team.name}</h4>
          <CapacityHeatmap
            members={team.members.map(m => ({
              name: m.user?.name,
              initials: m.user?.name?.slice(0, 2).toUpperCase(),
              capacity: m.capacity
            }))}
          />
        </div>
      ))}
    </div>
  );
};

export default TeamCapacity;
