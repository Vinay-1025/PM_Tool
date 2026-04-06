import { useSelector } from "react-redux";
import "./KpiRow.css";
import KpiCard from "./KpiCard";
import {
  FiFolder,
  FiPlay,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";

const KpiRow = () => {
  const projects = useSelector(state => state.projects.list || []);
  const teams = useSelector(state => state.teams.list || []);

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === "Active").length;

  const totalSprints = projects.reduce((acc, p) => acc + (p.sprints?.length || 0), 0);
  const totalTasks = projects.reduce((acc, p) => acc + (p.tasks?.length || 0), 0);

  return (
    <div className="kpiRow-container">
      <KpiCard
        title="Total Projects"
        value={totalProjects}
        trend="Live DB"
        trendType="neutral"
        icon={FiFolder}
      />

      <KpiCard
        title="Total Active Sprints"
        value={totalSprints}
        trend="Cross-Project"
        trendType="up"
        icon={FiPlay}
      />

      <KpiCard
        title="Active Teams"
        value={teams.length}
        trend="Allocated"
        trendType="neutral"
        icon={FiCheckCircle}
      />

      <KpiCard
        title="Total Backlog Tasks"
        value={totalTasks}
        trend="Aggregated"
        trendType="down"
        icon={FiAlertTriangle}
      />
    </div>
  );
};

export default KpiRow;
