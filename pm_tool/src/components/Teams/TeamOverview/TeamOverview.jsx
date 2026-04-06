import { useDispatch, useSelector } from "react-redux";
import TeamCard from "../TeamCard/TeamCard";
import { openTeamDrawer } from "../../../store/slices/teamSlice";

const TeamOverview = () => {
  const dispatch = useDispatch();
  const teams = useSelector(state => state.teams.list);

  return (
    <div className="teams-grid">
      {teams.map(team => (
        <TeamCard
          key={team._id}
          team={{
            ...team,
            members: team.members.map(m => ({
              name: m.user?.name,
              initials: m.user?.name?.slice(0, 2).toUpperCase()
            })),
            projects: team.projects?.length || 0,
            sprints: team.projects?.reduce((sum, p) => sum + (p.sprints?.length || 0), 0) || 0,
            lead: {
              name: team.lead?.name,
              initials: team.lead?.name?.slice(0, 2).toUpperCase()
            }
          }}
          onOpen={() => dispatch(openTeamDrawer(team))}
        />
      ))}
    </div>
  );
};

export default TeamOverview;
