import {
  FiPlus,
  FiClock,
  FiCheckCircle,
  FiSettings,
  FiLayers,
  FiBarChart2,
} from "react-icons/fi";
import "./ReleasesTabs.css";

const tabs = [
  { id: "create", label: "Create Release", icon: <FiPlus /> },
  { id: "planned", label: "Planned Releases", icon: <FiClock /> },
  { id: "executed", label: "Executed Releases", icon: <FiCheckCircle /> },
  { id: "manage", label: "Manage Releases", icon: <FiSettings /> },
  { id: "phases", label: "Project Phases", icon: <FiLayers /> },
  { id: "reports", label: "Reports", icon: <FiBarChart2 /> },
];

const ReleaseTabs = ({ active, onChange }) => {
  return (
    <div className="releaseTabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`releaseTab ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ReleaseTabs;
