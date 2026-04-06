import {
  FiUsers,
  FiUserCheck,
  FiActivity,
  FiLayers,
  FiBarChart2,
  FiSettings
} from "react-icons/fi";
import "./TeamsTabs.css";

const tabs = [
  { id: "overview", label: "Overview", icon: <FiUsers /> },
  { id: "members", label: "Members", icon: <FiUserCheck /> },
  { id: "capacity", label: "Capacity", icon: <FiActivity /> },
  { id: "projects", label: "Projects", icon: <FiLayers /> },
  { id: "reports", label: "Reports", icon: <FiBarChart2 /> },
  { id: "settings", label: "Settings", icon: <FiSettings /> }
];

const TeamsTabs = ({ active, onChange }) => {
  return (
    <div className="teamsTabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`teamsTab ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TeamsTabs;
