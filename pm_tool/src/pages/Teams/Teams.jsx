import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TeamsHeader from "../../components/Teams/TeamsHeader/TeamsHeader";
import TeamsToolbar from "../../components/Teams/TeamsToolbar/TeamsToolbar";
import TeamsTabs from "../../components/Teams/TeamsTabs/TeamsTabs";

import TeamOverview from "../../components/Teams/TeamOverview/TeamOverview";
import TeamMembers from "../../components/Teams/TeamMembers/TeamMembers";
import TeamCapacity from "../../components/Teams/TeamCapacity/TeamCapacity";
import TeamProjects from "../../components/Teams/TeamProjects/TeamProjects";
import TeamReports from "../../components/Teams/TeamReports/TeamReports";
import TeamSettings from "../../components/Teams/TeamSettings/TeamSettings";

import TeamDrawer from "../../components/Teams/TeamDrawer/TeamDrawer";
import CreateTeamDrawer from "../../components/Teams/CreateTeamDrawer/CreateTeamDrawer";

import {
  fetchTeams,
  createTeam,
  updateTeamUtilization,
  closeTeamDrawer
} from "../../store/slices/teamSlice";

import "./Teams.css";

const Teams = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("overview");
  const [createOpen, setCreateOpen] = useState(false);

  const { selectedTeam } = useSelector(state => state.teams);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleCreateTeam = (data) => {
    dispatch(createTeam(data))
      .unwrap()
      .then(() => {
        setCreateOpen(false);
        dispatch(fetchTeams());
      })
      .catch(err => {
        console.error("Create team failed", err);
        alert("Failed to create team");
      });
  };

  return (
    <div className="teams-page">
      <TeamsHeader onCreate={() => setCreateOpen(true)} />
      <TeamsToolbar />
      <TeamsTabs active={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && <TeamOverview />}
      {activeTab === "members" && <TeamMembers />}
      {activeTab === "capacity" && <TeamCapacity />}
      {activeTab === "projects" && <TeamProjects />}
      {activeTab === "reports" && <TeamReports />}
      {activeTab === "settings" && <TeamSettings />}

      {/* Drawers */}
      <CreateTeamDrawer
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateTeam}
      />

      <TeamDrawer
        team={selectedTeam}
        onClose={() => dispatch(closeTeamDrawer())}
        onUpdateUtil={(id, val) =>
          dispatch(updateTeamUtilization({
            teamId: id,
            utilization: val
          }))
        }
      />
    </div>
  );
};

export default Teams;
