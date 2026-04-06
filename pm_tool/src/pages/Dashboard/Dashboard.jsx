import "./Dashboard.css";
import KpiRow from "../../components/Dashboard/Kpi/KpiRow";
import TeamUtilizationChart from '../../components/Dashboard/TeamUtilizationChart/TeamUtilizationChart';

import ProjectHealthChart from "../../components/Dashboard/ProjectHealthChart/ProjectHealthChart";
import ActiveSprints from "../../components/Dashboard/ActiveSprints/ActiveSprints";
import UpcomingDeadlines from "../../components/Dashboard/UpcomingDeadlines/UpcomingDeadlines";
import TodoByDeadline from "../../components/Dashboard/TodoByDeadline/TodoByDeadline";
import TodoByPriority from "../../components/Dashboard/TodoByPriority/TodoByPriority";
import TodoByStatus from "../../components/Dashboard/TodoByStatus/TodoByStatus";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <KpiRow />

      <div className="dashboard-row dashboard-row-two">
        <TeamUtilizationChart />
        <ProjectHealthChart />
      </div>

      <div className="dashboard-row dashboard-row-two">
        <ActiveSprints />
        <UpcomingDeadlines />
      </div>

      <div className="dashboard-row dashboard-row-three">
        <TodoByDeadline />
        <TodoByPriority />
        <TodoByStatus />
      </div>
    </div>
  );
};

export default Dashboard;
